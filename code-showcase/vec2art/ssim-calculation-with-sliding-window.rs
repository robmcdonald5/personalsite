/// Calculate SSIM between two grayscale images
pub fn calculate_ssim(img1: &GrayImage, img2: &GrayImage) -> Result<SsimResult> {
    if img1.dimensions() != img2.dimensions() {
        return Err(anyhow!(
            "Images must have the same dimensions. Got {:?} and {:?}",
            img1.dimensions(),
            img2.dimensions()
        ));
    }
    let (width, height) = img1.dimensions();
    if width < WINDOW_SIZE as u32 || height < WINDOW_SIZE as u32 {
        return Err(anyhow!(
            "Images too small for SSIM calculation. Minimum {}x{}",
            WINDOW_SIZE, WINDOW_SIZE
        ));
    }
    let mut ssim_sum = 0.0;
    let mut luminance_sum = 0.0;
    let mut contrast_sum = 0.0;
    let mut structure_sum = 0.0;
    let mut window_count = 0;
    let half_window = WINDOW_SIZE / 2;
    for y in half_window..(height as usize - half_window) {
        for x in half_window..(width as usize - half_window) {
            let w1 = extract_window(img1, x, y, WINDOW_SIZE)?;
            let w2 = extract_window(img2, x, y, WINDOW_SIZE)?;
            let s1 = calculate_window_stats(&w1);
            let s2 = calculate_window_stats(&w2);
            let covariance = calculate_covariance(&w1, &w2, s1.mean, s2.mean);
            let luminance = (2.0 * s1.mean * s2.mean + C1)
                / (s1.mean.powi(2) + s2.mean.powi(2) + C1);
            let contrast = (2.0 * s1.std_dev * s2.std_dev + C2)
                / (s1.variance + s2.variance + C2);
            let structure = (covariance + C2 / 2.0)
                / (s1.std_dev * s2.std_dev + C2 / 2.0);
            let ssim = luminance * contrast * structure;
            ssim_sum += ssim;
            luminance_sum += luminance;
            contrast_sum += contrast;
            structure_sum += structure;
            window_count += 1;
        }
    }
    Ok(SsimResult {
        ssim: ssim_sum / window_count as f64,
        luminance: luminance_sum / window_count as f64,
        contrast: contrast_sum / window_count as f64,
        structure: structure_sum / window_count as f64,
    })
}
