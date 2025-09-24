// Check and install prerequisites for Rust/WASM
async function checkPrerequisites() {
    log.info('Checking prerequisites...');
    // Install Rust if needed
    if (!await commandExists('rustc')) {
        log.warning('Rust not found. Installing...');
        await execAsync("curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y");
        process.env.PATH = `${process.env.HOME}/.cargo/bin:${process.env.PATH}`;
        await execAsync('rustup target add wasm32-unknown-unknown');
        log.success('Rust installed');
    }
    // Install wasm‑pack if missing (fallback to cargo)
    if (!await commandExists('wasm-pack')) {
        log.warning('wasm-pack not found. Installing...');
        await execAsync('curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh')
            .catch(async () => {
                await execAsync('cargo install wasm-pack');
                log.success('wasm-pack installed via cargo');
            });
    }
    // Verify versions
    const { stdout: rustVersion } = await execAsync('rustc --version');
    const { stdout: wasmVersion } = await execAsync('wasm-pack --version');
    log.info(`Rust: ${rustVersion.trim()}`);
    log.info(`wasm-pack: ${wasmVersion.trim()}`);
    log.success('Prerequisites check complete');
}

// Remove old build artifacts and stale WASM files
async function cleanBuild() {
    log.info('Cleaning previous build artifacts...');
    await fs.rm(path.join(config.wasmDir, 'target'), { recursive: true, force: true });
    await fs.rm(path.join(config.wasmDir, 'pkg'), { recursive: true, force: true });
    // Delete all .wasm/.js/.d.ts files in the frontend wasm directory
    const files = await fs.readdir(config.frontendWasmDir);
    for (const file of files) {
        if (file.endsWith('.wasm') || file.endsWith('.js') || file.endsWith('.d.ts')) {
            await fs.unlink(path.join(config.frontendWasmDir, file));
        }
    }
    log.success('Clean complete');
}

// Build the WASM module using wasm‑pack
async function buildWasm() {
    log.info('Building WASM module...');
    const buildCmd = 'wasm-pack build --no-opt --target web --out-dir pkg --features wasm-base';
    const { stdout, stderr } = await execAsync(buildCmd, { cwd: config.wasmDir });
    if (config.verbose) {
        console.log(stdout);
        if (stderr) console.error(stderr);
    }
    log.success('WASM build complete');
}
