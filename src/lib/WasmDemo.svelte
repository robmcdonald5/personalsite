<script lang="ts">
  import { onMount } from 'svelte';
  import { ImageUtils, FallbackImageUtils } from '$lib/wasm/image-utils.js';

  let canvas: HTMLCanvasElement;
  let originalCanvas: HTMLCanvasElement;
  let fileInput: HTMLInputElement;
  let isProcessing = false;
  let wasmSupported = true;
  let currentFilter = 'none';
  let error = '';

  const filters = [
    { id: 'none', name: 'Original' },
    { id: 'blur', name: 'Blur (WASM)' },
    { id: 'brightness', name: 'Brighten (WASM)' },
    { id: 'grayscale', name: 'Grayscale (WASM)' },
    { id: 'thumbnail', name: 'Thumbnail (WASM)' }
  ];

  onMount(async () => {
    // Initialize with a sample image
    await loadSampleImage();
    
    // Try to initialize WASM
    try {
      await ImageUtils.init();
      console.log('🚀 WASM Demo: Image processor ready');
    } catch (err) {
      console.warn('⚠️ WASM Demo: Fallback mode activated -', err);
      wasmSupported = false;
    }
  });

  async function loadSampleImage() {
    // Load a sample image from your static assets
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setupCanvases(img);
    };
    img.onerror = () => {
      error = 'Failed to load sample image';
    };
    // Use one of your existing images
    img.src = '/hero__headshot.png';
  }

  function setupCanvases(img: HTMLImageElement) {
    // Set up original canvas
    originalCanvas.width = Math.min(img.width, 300);
    originalCanvas.height = Math.min(img.height, 300);
    const originalCtx = originalCanvas.getContext('2d');
    if (originalCtx) {
      originalCtx.drawImage(img, 0, 0, originalCanvas.width, originalCanvas.height);
    }

    // Set up processing canvas
    canvas.width = originalCanvas.width;
    canvas.height = originalCanvas.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(originalCanvas, 0, 0);
    }
  }

  async function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
      setupCanvases(img);
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  }

  async function applyFilter(filterId: string) {
    if (!canvas || !originalCanvas) return;
    
    isProcessing = true;
    error = '';
    currentFilter = filterId;

    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Always reset canvas to original dimensions first
      canvas.width = originalCanvas.width;
      canvas.height = originalCanvas.height;
      
      // Reset to original image
      ctx.drawImage(originalCanvas, 0, 0);

      if (filterId === 'none') {
        isProcessing = false;
        return;
      }

      if (wasmSupported) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let result;

        switch (filterId) {
          case 'blur':
            result = await ImageUtils.applyBlur(imageData, 2.0);
            break;
          case 'brightness':
            result = await ImageUtils.adjustBrightness(imageData, 30);
            break;
          case 'grayscale':
            result = await ImageUtils.convertToGrayscale(imageData);
            break;
          case 'thumbnail':
            result = await ImageUtils.createThumbnail(imageData, 150);
            // For thumbnail, we need to clear and resize the canvas
            canvas.width = result.width;
            canvas.height = result.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            break;
          default:
            throw new Error('Unknown filter');
        }

        if (result) {
          const processedImageData = new ImageData(
            new Uint8ClampedArray(result.data),
            result.width,
            result.height
          );
          ctx.putImageData(processedImageData, 0, 0);
        }
      } else {
        // Fallback to CSS filters for unsupported browsers
        switch (filterId) {
          case 'blur':
            ctx.filter = 'blur(2px)';
            break;
          case 'brightness':
            ctx.filter = 'brightness(1.3)';
            break;
          case 'grayscale':
            ctx.filter = 'grayscale(100%)';
            break;
        }
        ctx.drawImage(originalCanvas, 0, 0);
        ctx.filter = 'none';
      }
    } catch (err) {
      error = `Error applying filter: ${err}`;
      console.error(err);
    } finally {
      isProcessing = false;
    }
  }
</script>

<section class="w-full max-w-[1440px] py-16 px-[5%] md:px-[180px] bg-[#FAFAFA]">
  <div class="flex flex-col items-center gap-12">
    <!-- Header -->
    <div class="flex justify-center items-center flex-row gap-[49px] w-full max-w-[1080px]">
      <div class="flex-1 h-0 border-solid border-[#E0E0E0] border-b"></div>
      <span class="text-[#000000] text-xl font-montserrat font-medium whitespace-nowrap">
        WASM IMAGE PROCESSING DEMO
      </span>
      <div class="flex-1 h-0 border-solid border-[#E0E0E0] border-b"></div>
    </div>

    <!-- WASM Status -->
    <div class="text-center">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg {wasmSupported ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
        <div class="w-2 h-2 rounded-full {wasmSupported ? 'bg-green-500' : 'bg-yellow-500'}"></div>
        {wasmSupported ? 'WASM Accelerated' : 'Fallback Mode'}
      </div>
    </div>

    <!-- File Upload -->
    <div class="text-center">
      <input 
        bind:this={fileInput}
        type="file" 
        accept="image/*" 
        on:change={handleFileUpload}
        class="hidden"
      />
      <button 
        on:click={() => fileInput?.click()}
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Upload Image
      </button>
    </div>

    <!-- Canvas Display -->
    <div class="flex flex-wrap justify-center gap-8">
      <div class="text-center">
        <h3 class="text-lg font-semibold mb-4">Original</h3>
        <canvas 
          bind:this={originalCanvas}
          class="border border-gray-300 rounded-lg shadow-md max-w-[300px]"
        ></canvas>
      </div>
      <div class="text-center">
        <h3 class="text-lg font-semibold mb-4">Processed {wasmSupported ? '(WASM)' : '(Fallback)'}</h3>
        <canvas 
          bind:this={canvas}
          class="border border-gray-300 rounded-lg shadow-md max-w-[300px] {isProcessing ? 'opacity-50' : ''}"
        ></canvas>
        {#if isProcessing}
          <div class="mt-2 text-blue-600">Processing...</div>
        {/if}
      </div>
    </div>

    <!-- Filter Controls -->
    <div class="flex flex-wrap justify-center gap-4">
      {#each filters as filter}
        <button
          on:click={() => applyFilter(filter.id)}
          disabled={isProcessing}
          class="px-4 py-2 rounded-lg border transition-colors
                 {currentFilter === filter.id 
                   ? 'bg-blue-600 text-white border-blue-600' 
                   : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                 }
                 {isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}"
        >
          {filter.name}
        </button>
      {/each}
    </div>

    <!-- Error Display -->
    {#if error}
      <div class="text-red-600 text-center p-4 bg-red-50 rounded-lg border border-red-200">
        {error}
      </div>
    {/if}

    <!-- Performance Info -->
    <div class="text-sm text-gray-600 text-center max-w-2xl">
      <p>
        This demo showcases WebAssembly-powered image processing using Rust. 
        {#if wasmSupported}
          <strong>WASM is active</strong> - complex operations run at near-native speed!
        {:else}
          <strong>Fallback mode</strong> - using browser APIs where WASM is unavailable.
        {/if}
      </p>
      <p class="mt-2">
        Try uploading your own image and applying different filters to see the performance difference.
        All processing happens locally in your browser - no data is sent to any server.
      </p>
      {#if wasmSupported}
        <p class="mt-2 text-green-700 font-medium">
          🚀 Rust-compiled WebAssembly delivering near-native performance in your browser!
        </p>
      {/if}
    </div>
  </div>
</section>