pub fn validate_image_dimensions(width: u32, height: u32) -> Result<(), VectorizeError> {
    if width == 0 || height == 0 {
        return Err(VectorizeError::invalid_dimensions(
            width,
            height,
            "Image dimensions must be greater than 0",
        ));
    }
    if width > 16_384 || height > 16_384 {
        return Err(VectorizeError::invalid_dimensions(
            width,
            height,
            "Image dimensions too large (max 16384)",
        ));
    }
    let aspect_ratio = width as f64 / height as f64;
    if !(0.01..=100.0).contains(&aspect_ratio) {
        return Err(VectorizeError::invalid_dimensions(
            width,
            height,
            "Extreme aspect ratio (>100:1 or <1:100)",
        ));
    }
    Ok(())
}

/// Validate tolerance values
pub fn validate_tolerance(tolerance: f64, name: &str) -> Result<(), VectorizeError> {
    if tolerance <= 0.0 {
        return Err(VectorizeError::config_error(format!(
            "{name} tolerance must be positive"
        )));
    }
    if tolerance > 1_000.0 {
        return Err(VectorizeError::config_error(format!(
            "{name} tolerance too large (max 1000.0)"
        )));
    }
    Ok(())
}

/// Validate FDoG sigma parameters
pub fn validate_fdog_sigma(sigma_s: f32, sigma_c: f32) -> Result<(), VectorizeError> {
    if sigma_s <= 0.0 || sigma_c <= 0.0 {
        return Err(VectorizeError::config_error(
            "FDoG sigma values must be positive",
        ));
    }
    if sigma_s > 10.0 || sigma_c > 10.0 {
        return Err(VectorizeError::config_error(
            "FDoG sigma values too large (max 10.0)",
        ));
    }
    Ok(())
}
