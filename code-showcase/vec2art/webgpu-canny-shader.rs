// Non-Maximum Suppression kernel
@compute @workgroup_size(16, 16, 1)
fn non_maximum_suppression(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let x = global_id.x;
    let y = global_id.y;
    if (x >= params.width || y >= params.height) { return; }
    // Skip border pixels
    if (x == 0u || x == params.width - 1u || y == 0u || y == params.height - 1u) {
        edges[y * params.width + x] = 0u;
        return;
    }
    let idx = y * params.width + x;
    let magnitude = gradient_magnitude[idx];
    var direction = gradient_direction[idx];
    // Normalize direction to [0, π]
    if (direction < 0.0) {
        direction = direction + PI;
    }
    // Quantize direction and pick neighboring magnitudes
    var neighbor1_mag: f32;
    var neighbor2_mag: f32;
    if (direction < PI / 8.0 || direction >= 7.0 * PI / 8.0) {
        neighbor1_mag = gradient_magnitude[y * params.width + (x - 1u)];
        neighbor2_mag = gradient_magnitude[y * params.width + (x + 1u)];
    } else if (direction < 3.0 * PI / 8.0) {
        neighbor1_mag = gradient_magnitude[(y - 1u) * params.width + (x + 1u)];
        neighbor2_mag = gradient_magnitude[(y + 1u) * params.width + (x - 1u)];
    } else if (direction < 5.0 * PI / 8.0) {
        neighbor1_mag = gradient_magnitude[(y - 1u) * params.width + x];
        neighbor2_mag = gradient_magnitude[(y + 1u) * params.width + x];
    } else {
        neighbor1_mag = gradient_magnitude[(y - 1u) * params.width + (x - 1u)];
        neighbor2_mag = gradient_magnitude[(y + 1u) * params.width + (x + 1u)];
    }
    // Suppress non‑maximum pixels and apply double thresholding
    if (magnitude >= neighbor1_mag && magnitude >= neighbor2_mag) {
        if (magnitude >= params.high_threshold) {
            edges[idx] = 2u; // strong edge
        } else if (magnitude >= params.low_threshold) {
            edges[idx] = 1u; // weak edge
        } else {
            edges[idx] = 0u;
        }
    } else {
        edges[idx] = 0u;
    }
}

// Hysteresis tracking kernel
@compute @workgroup_size(16, 16, 1)
fn hysteresis_tracking(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let x = global_id.x;
    let y = global_id.y;
    if (x >= params.width || y >= params.height) { return; }
    let idx = y * params.width + x;
    // Only process weak edges (label 1)
    if (edges[idx] != 1u) { return; }
    var has_strong_neighbor = false;
    for (var dy: i32 = -1; dy <= 1; dy = dy + 1) {
        for (var dx: i32 = -1; dx <= 1; dx = dx + 1) {
            if (dx == 0 && dy == 0) { continue; }
            let nx: i32 = i32(x) + dx;
            let ny: i32 = i32(y) + dy;
            if (nx >= 0 && nx < i32(params.width) && ny >= 0 && ny < i32(params.height)) {
                let neighbor_idx: u32 = u32(ny) * params.width + u32(nx);
                if (edges[neighbor_idx] == 2u) {
                    has_strong_neighbor = true;
                    break;
                }
            }
        }
        if (has_strong_neighbor) { break; }
    }
    // Promote weak edge to strong if connected
    if (has_strong_neighbor) {
        edges[idx] = 2u;
    }
}
