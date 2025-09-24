/// Render SVG content to an RGBA image
fn render_svg_to_image(svg_content: &str, dimensions: (u32, u32)) -> Result<RgbaImage> {
    let (width, height) = dimensions;
    // Parse the SVG
    let options = usvg::Options::default();
    let tree = usvg::Tree::from_str(svg_content, &options)
        .context("Failed to parse SVG")?;
    // Create a pixmap for rendering
    let mut pixmap = tiny_skia::Pixmap::new(width, height)
        .context("Failed to create pixmap for SVG rendering")?;
    // Render SVG to pixmap
    resvg::render(
        &tree,
        tiny_skia::Transform::identity(),
        &mut pixmap.as_mut(),
    );
    // Convert the pixmap to an RgbaImage (swapping BGRA → RGBA channels)
    let mut img = RgbaImage::new(width, height);
    for (i, pixel) in pixmap.data().chunks_exact(4).enumerate() {
        let x = i as u32 % width;
        let y = i as u32 / width;
        if x < width && y < height {
            img.put_pixel(x, y, Rgba([pixel[2], pixel[1], pixel[0], pixel[3]]));
        }
    }
    Ok(img)
}
