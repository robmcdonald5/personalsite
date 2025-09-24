async initialize(options ?: { threadCount?: number; autoInitThreads?: boolean }): Promise < void> {
    if(!browser) {
        throw new Error('VectorizerService can only be initialized in the browser');
    }
    if(this.isInitialized) return;
    if(this.initializationPromise) return this.initializationPromise;
    this.initializationPromise = this._doInitialize(options);
    return this.initializationPromise;
}

private async _doInitialize(options ?: { threadCount?: number; autoInitThreads?: boolean }): Promise < void> {
    try {
        // Lazy-load the vectorizer and create a new instance
        this.wasmModule = await loadVectorizer({
            initializeThreads: options?.autoInitThreads ?? false,
            threadCount: options?.threadCount,
        });
        this.vectorizer = await createVectorizer();
        this.isInitialized = true;
    } catch(error) {
        const wasmError: VectorizerError = {
            type: 'unknown',
            message: 'Failed to initialize WASM module',
            details: error instanceof Error ? error.message : String(error),
        };
        throw wasmError;
    }
}

/**
 * Safely call a function on the WASM vectorizer instance if it exists.
 */
private safeCall(functionName: string, ...args: any[]): boolean {
    if (!this.vectorizer) {
        console.warn(`[VectorizerService] Cannot call ${functionName}: vectorizer not initialized`);
        return false;
    }
    if (typeof this.vectorizer[functionName] !== 'function') {
        console.warn(`[VectorizerService] Function ${functionName} not available in WASM module - skipping`);
        return false;
    }
    try {
        this.vectorizer[functionName](...args);
        return true;
    } catch (error) {
        console.error(`[VectorizerService] Error calling ${functionName}:`, error);
        return false;
    }
}
