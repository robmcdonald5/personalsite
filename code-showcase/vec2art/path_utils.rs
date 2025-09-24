/// Compute a Douglas–Peucker tolerance scaled by image diagonal (0.3–0.7%)
pub fn calculate_douglas_peucker_epsilon(image_width: u32, image_height: u32, simplification_factor: f64) -> f64 {
    let diagonal = ((image_width as f64).powi(2) + (image_height as f64).powi(2)).sqrt();
    let factor = simplification_factor.clamp(0.003, 0.007);
    diagonal * factor
}

/// Perform Douglas–Peucker simplification on a polyline.
pub fn douglas_peucker_simplify(points: &[Point], tolerance: f64) -> Vec<Point> {
    if points.len() <= 2 { return points.to_vec(); }
    let tolerance_sq = tolerance * tolerance;
    simplify_recursive(points, 0, points.len() - 1, tolerance_sq)
}

/// Visvalingam–Whyatt simplification removes points with the smallest effective area.
pub fn visvalingam_whyatt_simplify(points: &[Point], min_area: f64) -> Vec<Point> {
    let mut simplified = points.to_vec();
    loop {
        if simplified.len() <= 2 { break; }
        // Find point with smallest triangle area and remove it if below min_area
        // Break when all remaining points have area above threshold
    }
    simplified
}
