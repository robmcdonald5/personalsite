import { browser } from '$app/environment';

// WASM module interface
interface ImageProcessor {
  new (): ImageProcessor;
  resize_image(data: Uint8Array, width: number, height: number, newWidth: number, newHeight: number): Uint8Array;
  blur_image(data: Uint8Array, width: number, height: number, sigma: number): Uint8Array;
  brighten_image(data: Uint8Array, width: number, height: number, value: number): Uint8Array;
  grayscale_image(data: Uint8Array, width: number, height: number): Uint8Array;
  create_thumbnail(data: Uint8Array, width: number, height: number, thumbSize: number): Uint8Array;
  get_thumbnail_dimensions(width: number, height: number, thumbSize: number): number[];
}

interface WasmModule {
  ImageProcessor: { new (): ImageProcessor };
  default: (module_or_path?: string | URL) => Promise<any>;
}

let wasmModule: WasmModule | null = null;
let processor: ImageProcessor | null = null;

// Load WASM module
export async function initImageProcessor(): Promise<ImageProcessor> {
  if (processor) return processor;

  if (!browser) {
    throw new Error('WASM image processor only available in browser environment');
  }

  try {
    // Check if WebAssembly is supported
    if (typeof WebAssembly === 'undefined') {
      throw new Error('WebAssembly is not supported in this browser');
    }

    // Dynamic import of the WASM module with cache busting
    const wasmPath = `/wasm-modules/image-processor/image_processor.js?v=${Date.now()}`;
    wasmModule = await import(/* @vite-ignore */ wasmPath);
    
    // Initialize WASM module (required for modern wasm-pack)
    if (wasmModule?.default) {
      await wasmModule.default();
    }
    
    if (wasmModule?.ImageProcessor) {
      processor = new wasmModule.ImageProcessor();
    } else {
      throw new Error('ImageProcessor not found in WASM module');
    }
    console.log('✅ WASM image processor initialized successfully');
    return processor;
  } catch (error) {
    console.warn('❌ Failed to load WASM image processor:', error);
    if (error instanceof Error) {
      console.warn('Error details:', error.message);
    }
    throw error;
  }
}

// Helper to get image data from canvas
export function getImageData(canvas: HTMLCanvasElement): ImageData {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

// Helper to put image data back to canvas
export function putImageData(canvas: HTMLCanvasElement, data: Uint8Array, width: number, height: number): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');
  
  const imageData = new ImageData(new Uint8ClampedArray(data), width, height);
  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(imageData, 0, 0);
}

// Utility functions with error handling and fallbacks
export class ImageUtils {
  private static processor: ImageProcessor | null = null;

  static async init(): Promise<void> {
    if (this.processor) return;
    try {
      this.processor = await initImageProcessor();
    } catch (error) {
      console.warn('WASM processor failed to initialize:', error);
      throw error;
    }
  }

  static async resizeImage(
    imageData: ImageData, 
    newWidth: number, 
    newHeight: number
  ): Promise<{ data: Uint8Array; width: number; height: number }> {
    await this.init();
    if (!this.processor) throw new Error('Image processor not initialized');

    const resized = this.processor.resize_image(
      new Uint8Array(imageData.data),
      imageData.width,
      imageData.height,
      newWidth,
      newHeight
    );

    return {
      data: resized,
      width: newWidth,
      height: newHeight
    };
  }

  static async createThumbnail(
    imageData: ImageData,
    maxSize: number
  ): Promise<{ data: Uint8Array; width: number; height: number }> {
    await this.init();
    if (!this.processor) throw new Error('Image processor not initialized');

    // Validate input parameters
    if (maxSize <= 0) throw new Error('Thumbnail size must be positive');
    if (imageData.width <= 0 || imageData.height <= 0) throw new Error('Invalid image dimensions');

    const dimensions = this.processor.get_thumbnail_dimensions(
      imageData.width,
      imageData.height,
      maxSize
    );

    console.log('Raw WASM dimensions result:', dimensions);
    
    // Validate returned dimensions
    if (!dimensions || dimensions.length < 2 || dimensions[0] <= 0 || dimensions[1] <= 0) {
      throw new Error(`WASM returned invalid thumbnail dimensions: ${dimensions}`);
    }

    const thumbnailData = this.processor.create_thumbnail(
      new Uint8Array(imageData.data),
      imageData.width,
      imageData.height,
      maxSize
    );

    return {
      data: thumbnailData,
      width: dimensions[0],
      height: dimensions[1]
    };
  }

  static async applyBlur(
    imageData: ImageData,
    sigma: number
  ): Promise<{ data: Uint8Array; width: number; height: number }> {
    await this.init();
    if (!this.processor) throw new Error('Image processor not initialized');

    const blurred = this.processor.blur_image(
      new Uint8Array(imageData.data),
      imageData.width,
      imageData.height,
      sigma
    );

    return {
      data: blurred,
      width: imageData.width,
      height: imageData.height
    };
  }

  static async adjustBrightness(
    imageData: ImageData,
    value: number
  ): Promise<{ data: Uint8Array; width: number; height: number }> {
    await this.init();
    if (!this.processor) throw new Error('Image processor not initialized');

    const brightened = this.processor.brighten_image(
      new Uint8Array(imageData.data),
      imageData.width,
      imageData.height,
      value
    );

    return {
      data: brightened,
      width: imageData.width,
      height: imageData.height
    };
  }

  static async convertToGrayscale(
    imageData: ImageData
  ): Promise<{ data: Uint8Array; width: number; height: number }> {
    await this.init();
    if (!this.processor) throw new Error('Image processor not initialized');

    const grayscale = this.processor.grayscale_image(
      new Uint8Array(imageData.data),
      imageData.width,
      imageData.height
    );

    return {
      data: grayscale,
      width: imageData.width,
      height: imageData.height
    };
  }
}

// Fallback JavaScript implementations (simplified versions)
export class FallbackImageUtils {
  static resizeCanvas(canvas: HTMLCanvasElement, newWidth: number, newHeight: number): HTMLCanvasElement {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = newWidth;
    newCanvas.height = newHeight;
    
    const ctx = newCanvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(canvas, 0, 0, newWidth, newHeight);
    }
    
    return newCanvas;
  }

  static applyCanvasFilter(canvas: HTMLCanvasElement, filter: string): HTMLCanvasElement {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    
    const ctx = newCanvas.getContext('2d');
    if (ctx) {
      ctx.filter = filter;
      ctx.drawImage(canvas, 0, 0);
    }
    
    return newCanvas;
  }
}