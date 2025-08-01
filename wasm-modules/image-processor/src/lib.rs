use wasm_bindgen::prelude::*;

// Import the `console.log` function from the browser
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// Define a macro to provide `console.log!(format_args!(...))` syntax
macro_rules! console_log {
    ( $( $t:tt )* ) => {
        log(&format!( $( $t )* ))
    }
}

#[wasm_bindgen]
pub struct ImageProcessor;

#[wasm_bindgen]
impl ImageProcessor {
    #[wasm_bindgen(constructor)]
    pub fn new() -> ImageProcessor {
        console_log!("ImageProcessor initialized");
        ImageProcessor
    }

    /// Resize an image given as raw RGBA bytes
    #[wasm_bindgen]
    pub fn resize_image(&self, data: &[u8], width: u32, height: u32, new_width: u32, new_height: u32) -> Vec<u8> {
        console_log!("Resizing image from {}x{} to {}x{}", width, height, new_width, new_height);
        
        match image::RgbaImage::from_raw(width, height, data.to_vec()) {
            Some(img) => {
                let resized = image::imageops::resize(
                    &img,
                    new_width,
                    new_height,
                    image::imageops::FilterType::Lanczos3,
                );
                resized.into_raw()
            }
            None => {
                console_log!("Failed to create image from raw data");
                data.to_vec()
            }
        }
    }

    /// Apply a blur filter to an image
    #[wasm_bindgen]
    pub fn blur_image(&self, data: &[u8], width: u32, height: u32, sigma: f32) -> Vec<u8> {
        console_log!("Applying blur with sigma: {}", sigma);
        
        match image::RgbaImage::from_raw(width, height, data.to_vec()) {
            Some(img) => {
                let blurred = image::imageops::blur(&img, sigma);
                blurred.into_raw()
            }
            None => {
                console_log!("Failed to create image from raw data");
                data.to_vec()
            }
        }
    }

    /// Adjust brightness of an image
    #[wasm_bindgen]
    pub fn brighten_image(&self, data: &[u8], width: u32, height: u32, value: i32) -> Vec<u8> {
        console_log!("Adjusting brightness by: {}", value);
        
        match image::RgbaImage::from_raw(width, height, data.to_vec()) {
            Some(img) => {
                let brightened = image::imageops::brighten(&img, value);
                brightened.into_raw()
            }
            None => {
                console_log!("Failed to create image from raw data");
                data.to_vec()
            }
        }
    }

    /// Convert image to grayscale
    #[wasm_bindgen]
    pub fn grayscale_image(&self, data: &[u8], width: u32, height: u32) -> Vec<u8> {
        console_log!("Converting image to grayscale");
        
        match image::RgbaImage::from_raw(width, height, data.to_vec()) {
            Some(img) => {
                let gray = image::imageops::grayscale(&img);
                // Convert back to RGBA
                let rgba_gray = image::DynamicImage::ImageLuma8(gray).into_rgba8();
                rgba_gray.into_raw()
            }
            None => {
                console_log!("Failed to create image from raw data");
                data.to_vec()
            }
        }
    }

    /// Create a thumbnail with specified dimensions
    #[wasm_bindgen]
    pub fn create_thumbnail(&self, data: &[u8], width: u32, height: u32, thumb_size: u32) -> Vec<u8> {
        console_log!("Creating thumbnail of size: {}x{}", thumb_size, thumb_size);
        
        match image::RgbaImage::from_raw(width, height, data.to_vec()) {
            Some(img) => {
                let thumbnail = image::imageops::thumbnail(&img, thumb_size, thumb_size);
                thumbnail.into_raw()
            }
            None => {
                console_log!("Failed to create image from raw data");
                data.to_vec()
            }
        }
    }

    /// Get the dimensions that would result from thumbnail creation
    #[wasm_bindgen]
    pub fn get_thumbnail_dimensions(&self, width: u32, height: u32, thumb_size: u32) -> js_sys::Array {
        // Ensure we don't get zero dimensions
        if width == 0 || height == 0 || thumb_size == 0 {
            let result = js_sys::Array::new();
            result.push(&JsValue::from(1u32));
            result.push(&JsValue::from(1u32));
            return result;
        }
        
        let aspect_ratio = width as f32 / height as f32;
        let (new_width, new_height) = if width > height {
            // Landscape: limit width to thumb_size
            let new_height = (thumb_size as f32 / aspect_ratio).max(1.0) as u32;
            (thumb_size, new_height)
        } else {
            // Portrait or square: limit height to thumb_size
            let new_width = (thumb_size as f32 * aspect_ratio).max(1.0) as u32;
            (new_width, thumb_size)
        };
        
        // Ensure minimum dimensions of 1x1
        let final_width = new_width.max(1);
        let final_height = new_height.max(1);
        
        console_log!("Thumbnail dimensions: {}x{} -> {}x{}", width, height, final_width, final_height);
        
        let result = js_sys::Array::new();
        result.push(&JsValue::from(final_width));
        result.push(&JsValue::from(final_height));
        result
    }
}

// Initialize panic hook for better error messages in development
#[wasm_bindgen(start)]
pub fn main() {
    console_log!("WASM Image Processor module loaded");
}