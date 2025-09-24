/// Extract a window from an image at the specified position
fn extract_window(
    img: &GrayImage,
    center_x: usize,
    center_y: usize,
    window_size: usize,
) -> Result<Vec<f64>> {
    let half_window = window_size / 2;
    let mut window = Vec::with_capacity(window_size * window_size);
    for dy in 0..window_size {
        for dx in 0..window_size {
            let x = center_x - half_window + dx;
            let y = center_y - half_window + dy;
            if let Some(pixel) = img.get_pixel_checked(x as u32, y as u32) {
                window.push(pixel[0] as f64);
            } else {
                return Err(anyhow::anyhow!("Window extends beyond image bounds"));
            }
        }
    }
    Ok(window)
}

/// Calculate statistics for a window
fn calculate_window_stats(window: &[f64]) -> WindowStats {
    let mean = window.iter().sum::<f64>() / window.len() as f64;
    let variance = window
        .iter()
        .map(|&x| (x - mean).powi(2))
        .sum::<f64>() / window.len() as f64;
    let std_dev = variance.sqrt();
    WindowStats { mean, variance, std_dev }
}

/// Calculate covariance between two windows
fn calculate_covariance(window1: &[f64], window2: &[f64], mean1: f64, mean2: f64) -> f64 {
    window1
        .iter()
        .zip(window2.iter())
        .map(|(&x1, &x2)| (x1 - mean1) * (x2 - mean2))
        .sum::<f64>() / window1.len() as f64
}
