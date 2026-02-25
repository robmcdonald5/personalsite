<script lang="ts">
    // @ts-nocheck
    import { onMount } from 'svelte';
    // …imports omitted…

    // Derived states to manage UI
    const uiState = $derived(files.length === 0 && originalImageUrls.length === 0 && results.length === 0 ? 'EMPTY' : 'LOADED');
    const canConvert = $derived(hasFiles && !isProcessing && pageLoaded && !initError);

    // On mount, initialize config store and restore saved images
    onMount(async () => {
        await algorithmConfigStore.initialize();
        await wasmWorkerService.initialize({});
        const hasRestoredImages = await converterState.loadSavedImageState();
        // …update UI state from restored images…
    });

    // Handle conversion of all selected files
    async function handleConvert() {
        if (!canConvert) {
            // Show error messages if conversion isn’t possible
            return;
        }
        isProcessing = true;
        announceToScreenReader('Starting image conversion');

        const currentAlgorithm = algorithmConfigStore.currentAlgorithm;
        const config = algorithmConfigStore.getCurrentConfig();

        const processedResults: ProcessingResult[] = [];
        const newPreviewUrls: (string | null)[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            // Draw image into a canvas to get ImageData
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            const img = new Image();
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = originalImageUrls[i]!;
            });
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, img.width, img.height);

            // Process the image using the WASM worker service
            const result = await wasmWorkerService.processImage(imageData, config);
            processedResults.push(result);

            // Generate a preview URL for the returned SVG
            if (result.svg) {
                const blob = new Blob([result.svg], { type: 'image/svg+xml' });
                newPreviewUrls.push(URL.createObjectURL(blob));
            } else {
                newPreviewUrls.push(null);
            }
        }

        results = processedResults;
        previewSvgUrls = newPreviewUrls;
        isProcessing = false;
    }
</script>
