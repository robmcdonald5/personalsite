pub fn compute_etf(gray: &GrayImage, cfg: &EtfConfig) -> EtfField {
    let width = gray.width();
    let height = gray.height();
    // Step 1: compute image gradients with a Sobel operator
    let (grad_x, grad_y) = compute_gradients(gray);
    // Step 2: build a structure tensor for each pixel and apply Gaussian smoothing
    let tensor_field = compute_structure_tensor(&grad_x, &grad_y, width, height, cfg.sigma);
    // Step 3: extract initial tangent directions and coherency values
    let mut etf_field = extract_initial_tangents(&tensor_field, width, height, cfg.coherency_tau);
    // Step 4: iteratively refine the ETF for smoother, more coherent flow
    refine_etf_field(&mut etf_field, cfg.radius, cfg.iters);
    etf_field
}
