#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct TraceDefaultConfig {
    pub min_grad: f32,       // Minimum gradient magnitude (0.08)
    pub min_coherency: f32,  // Minimum coherency threshold (0.15)
    pub max_gap: u32,        // Maximum gap size in pixels (4)
    pub max_len: usize,      // Max polyline length (10_000)
}

pub mod validation {
    use crate::error::VectorizeError;

    /// Ensure image dimensions are non‑zero, within 16 kpx and not extreme in aspect ratio.
    pub fn validate_image_dimensions(width: u32, height: u32) -> Result<(), VectorizeError> {
        if width == 0 || height == 0 {
            return Err(VectorizeError::invalid_dimensions(width, height, "Image dimensions must be > 0"));
        }
        if width > 16384 || height > 16384 {
            return Err(VectorizeError::invalid_dimensions(width, height, "Image dimensions too large (max 16384)"));
        }
        let ratio = width as f64 / height as f64;
        if !(0.01..=100.0).contains(&ratio) {
            return Err(VectorizeError::invalid_dimensions(width, height, "Extreme aspect ratio (>100:1 or <1:100)"));
        }
        Ok(())
    }

    /// Validate superpixel configuration – enforce 20‑2000 superpixels, compactness 1–50, iterations 1–50.
    pub fn validate_superpixel_config(num_superpixels: u32, compactness: f32, iterations: u32) -> Result<(), VectorizeError> {
        if !(20..=2000).contains(&num_superpixels) {
            return Err(VectorizeError::config_error(format!("Number of superpixels must be 20–2000, got {}", num_superpixels)));
        }
        if !(1.0..=50.0).contains(&compactness) {
            return Err(VectorizeError::config_error(format!("Superpixel compactness must be 1.0–50.0, got {}", compactness)));
        }
        if !(1..=50).contains(&iterations) {
            return Err(VectorizeError::config_error(format!("SLIC iterations must be 1–50, got {}", iterations)));
        }
        Ok(())
    }
}
