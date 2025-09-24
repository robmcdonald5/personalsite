/// SSIM calculation result
#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub struct SsimResult {
    pub ssim: f64,
    pub luminance: f64,
    pub contrast: f64,
    pub structure: f64,
}
impl SsimResult {
    /// Check if SSIM meets the research target of ≥ 0.92
    pub fn meets_target(&self) -> bool {
        self.ssim >= 0.92
    }
    /// Get quality grade based on SSIM score
    pub fn quality_grade(&self) -> &'static str {
        match self.ssim {
            x if x >= 0.95 => "Excellent",
            x if x >= 0.92 => "Good (Target Met)",
            x if x >= 0.85 => "Fair",
            x if x >= 0.70 => "Poor",
            _ => "Very Poor",
        }
    }
}
