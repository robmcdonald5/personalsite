let wasmModule = null;

async function loadWasmModule() {
    if (wasmModule) return wasmModule;
    // Load the generated JS wrapper as a script tag
    const script = document.createElement('script');
    script.src = '/wasm/vectorize_wasm.js';
    const scriptLoaded = new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
    });
    document.head.appendChild(script);
    await scriptLoaded;

    if (typeof wasm_bindgen === 'undefined') {
        throw new Error('wasm_bindgen not found after loading script');
    }
    // Initialize the WASM module
    await wasm_bindgen('/wasm/vectorize_wasm_bg.wasm');
    wasmModule = wasm_bindgen;
    console.log('✅ WASM module loaded successfully');
    return wasmModule;
}
window.loadWasmModule = loadWasmModule;
