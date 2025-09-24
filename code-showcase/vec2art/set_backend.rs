#[wasm_bindgen]
pub fn set_backend(&mut self, backend: &str) -> Result<(), JsValue> {
    let backend = match backend.to_lowercase().as_str() {
        "edge"       => TraceBackend::Edge,
        "centerline" => TraceBackend::Centerline,
        "superpixel" => TraceBackend::Superpixel,
        "dots"       => TraceBackend::Dots,
        _ => {
            return Err(JsValue::from_str(&format!("Unknown backend: {}", backend)));
        }
    };

    log::info!("WASM: set_backend called with backend={:?}", backend);
    web_sys::console::log_1(&format!("DIRECT: set_backend called with {:?}", backend).into());
    self.backend = backend;

    // Preserve user settings when changing backend
    match self.config_builder.clone().backend(backend).build() {
        Ok(_) => {
            self.config_builder = self.config_builder.clone().backend(backend);
            log::info!("✅ WASM: Backend set to {:?} (preserving existing settings)", backend);
        }
        Err(e) => {
            // Validation failed – fall back to fresh builder (user must reapply settings)
            web_sys::console::log_1(&format!("❌ DIRECT: Config validation FAILED, error: {}", e).into());
            self.config_builder = ConfigBuilder::new().backend(backend);
            log::info!("✅ WASM: Backend set to {:?} (fresh config - settings need re-application)", backend);
        }
    }

    log::info!("✅ WASM: Backend set to: {:?} with config preservation strategy", self.backend);
    Ok(())
}
