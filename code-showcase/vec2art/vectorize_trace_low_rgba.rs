pub fn vectorize_trace_low_rgba(
    image: &ImageBuffer<Rgba<u8>, Vec<u8>>,
    config: &TraceLowConfig,
    hand_drawn_config: Option<&crate::algorithms::visual::hand_drawn::HandDrawnConfig>,
) -> Result<String, VectorizeError> {
    use input_validation::validate_image_input;
    use preprocessing::{
        adjust_trace_low_config, analyze_resolution_requirements,
        apply_background_removal, apply_resolution_processing, scale_svg_coordinates,
        BackgroundRemovalConfig, ResolutionConfig,
    };

    log::info!("Starting trace-low vectorization with config: {config:?}");

    // Validate inputs and configuration
    validate_image_input(image)?;
    validate_trace_low_config(config)?;

    // Detect single-color or empty images and return minimal SVG
    if is_empty_or_single_color_image(image) {
        log::warn!("Image appears to be empty or single color, generating minimal SVG");
        return Ok(generate_minimal_svg(image.width(), image.height(), "trace-low"));
    }

    // Analyze resolution and apply resolution-aware processing
    let resolution_config = ResolutionConfig { max_dimension: config.max_image_size };
    let resolution_analysis = analyze_resolution_requirements(image, &resolution_config);
    let mut processing_image = apply_resolution_processing(image, &resolution_analysis)?;

    // Background removal (disabled later to avoid double processing)
    if config.enable_background_removal {
        let bg_removal_config = BackgroundRemovalConfig {
            algorithm: config.background_removal_algorithm,
            strength: config.background_removal_strength,
            threshold_override: config.background_removal_threshold,
        };
        processing_image = apply_background_removal(&processing_image, &bg_removal_config)?.image;
    }

    // Adjust configuration based on resolution and disable redundant background removal
    let mut adjusted_config =
        adjust_trace_low_config(config, &resolution_analysis.parameter_adjustments);
    if config.enable_background_removal {
        adjusted_config.enable_background_removal = false;
    }

    // Invoke the trace‑low algorithm on the processed image
    let svg_paths = vectorize_trace_low(&processing_image, &adjusted_config, hand_drawn_config)?;

    // Fallback to minimal SVG when no paths were generated
    if svg_paths.is_empty() {
        log::warn!("No paths generated, creating minimal SVG");
        return Ok(generate_minimal_svg(image.width(), image.height(), "trace-low"));
    }

    // Build complete SVG document and rescale to original size
    let svg_config = SvgConfig { precision: config.svg_precision, optimize: true, include_metadata: false };
    let svg_document = svg::generate_svg_document(&svg_paths, processing_image.width(), processing_image.height(), &svg_config);
    let final_svg = scale_svg_coordinates(&svg_document, &resolution_analysis)?;

    Ok(final_svg)
}
