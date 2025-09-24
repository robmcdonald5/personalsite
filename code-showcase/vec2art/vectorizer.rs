#[wasm_bindgen]
pub fn vectorize(&self, image_data: &ImageData) -> Result<String, JsValue> {
    log::info!("🖼️ Starting vectorization");
    // Convert ImageData into an ImageBuffer
    let width = image_data.width();
    let height = image_data.height();
    let data_vec: Vec<u8> = image_data.data().to_vec();
    let img_buffer = ImageBuffer::from_raw(width, height, data_vec)
        .ok_or_else(|| JsValue::from_str("Failed to create image buffer from ImageData"))?;

    // Build internal configuration
    let (config, hand_drawn_cfg) = self.config_manager.build_internal()
        .map_err(|e| JsValue::from_str(&format!("Configuration error: {}", e)))?;

    // Perform vectorization using the core algorithm
    let result = vectorize_trace_low_rgba(&img_buffer, &config, hand_drawn_cfg.as_ref())
        .map_err(|e| JsValue::from_str(&format!("Vectorization failed: {}", e)))?;

    log::info!("✅ Vectorization complete! Generated {} bytes of SVG", result.len());
    Ok(result)
}

#[wasm_bindgen]
pub fn vectorize_with_progress(
    &self,
    image_data: &ImageData,
    callback: Option<Function>,
) -> Result<String, JsValue> {
    let start_time = js_sys::Date::now();

    // Emit “initialization” progress
    if let Some(ref cb) = callback {
        let progress = serde_json::json!({
            "stage": "initialization",
            "percent": 0.0,
            "message": "Starting vectorization...",
            "processing_time_ms": 0.0,
        });
        let _ = cb.call1(&JsValue::NULL, &serde_wasm_bindgen::to_value(&progress).unwrap());
    }

    // Emit “processing” progress
    if let Some(ref cb) = callback {
        let progress = serde_json::json!({
            "stage": "processing",
            "percent": 50.0,
            "message": format!("Processing with {} backend...", self.config_manager.get_backend()),
            "processing_time_ms": js_sys::Date::now() - start_time,
        });
        let _ = cb.call1(&JsValue::NULL, &serde_wasm_bindgen::to_value(&progress).unwrap());
    }

    // Do the vectorization and emit a final completion message
    let result = self.vectorize(image_data)?;
    if let Some(ref cb) = callback {
        let progress = serde_json::json!({
            "stage": "complete",
            "percent": 100.0,
            "message": format!("Vectorization complete! Generated {} bytes of SVG", result.len()),
            "svg_size": result.len(),
            "processing_time_ms": js_sys::Date::now() - start_time,
        });
        let _ = cb.call1(&JsValue::NULL, &serde_wasm_bindgen::to_value(&progress).unwrap());
    }

    Ok(result)
}
