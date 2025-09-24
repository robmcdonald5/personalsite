async setInputFile(file: File): Promise < void> {
    try {
        this.clearError();
        this._imageState.input_file = file;

        // Convert file into ImageData
        const imageData = await this.fileToImageData(file);
        this._imageState.input_image = imageData;

        // Persist the file to IndexedDB for session restoration
        const result = await imagePersistence.saveImageSession([file]);
        if(result.success && result.sessionId) {
    this.currentSessionId = result.sessionId;
}

console.log(`[ConverterStateStore] Set input file: ${file.name} (${imageData.width}x${imageData.height})`);
    } catch (error) {
    const fileError = {
        type: 'processing' as const,
        message: 'Failed to load image file',
        details: error instanceof Error ? error.message : String(error),
    };
    this.setError(fileError);
    throw error;
}
}
