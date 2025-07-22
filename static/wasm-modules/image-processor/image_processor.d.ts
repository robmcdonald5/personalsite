/* tslint:disable */
/* eslint-disable */
export function main(): void;
export class ImageProcessor {
  free(): void;
  constructor();
  /**
   * Resize an image given as raw RGBA bytes
   */
  resize_image(data: Uint8Array, width: number, height: number, new_width: number, new_height: number): Uint8Array;
  /**
   * Apply a blur filter to an image
   */
  blur_image(data: Uint8Array, width: number, height: number, sigma: number): Uint8Array;
  /**
   * Adjust brightness of an image
   */
  brighten_image(data: Uint8Array, width: number, height: number, value: number): Uint8Array;
  /**
   * Convert image to grayscale
   */
  grayscale_image(data: Uint8Array, width: number, height: number): Uint8Array;
  /**
   * Create a thumbnail with specified dimensions
   */
  create_thumbnail(data: Uint8Array, width: number, height: number, thumb_size: number): Uint8Array;
  /**
   * Get the dimensions that would result from thumbnail creation
   */
  get_thumbnail_dimensions(width: number, height: number, thumb_size: number): Array<any>;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_imageprocessor_free: (a: number, b: number) => void;
  readonly imageprocessor_new: () => number;
  readonly imageprocessor_resize_image: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => [number, number];
  readonly imageprocessor_blur_image: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number];
  readonly imageprocessor_brighten_image: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number];
  readonly imageprocessor_grayscale_image: (a: number, b: number, c: number, d: number, e: number) => [number, number];
  readonly imageprocessor_create_thumbnail: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number];
  readonly imageprocessor_get_thumbnail_dimensions: (a: number, b: number, c: number, d: number) => any;
  readonly main: () => void;
  readonly __wbindgen_export_0: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
