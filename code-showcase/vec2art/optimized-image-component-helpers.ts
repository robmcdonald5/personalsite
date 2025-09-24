function getFormatSource(format: string): string {
    const lastDot = src.lastIndexOf('.');
    if (lastDot === -1) return src;
    const basePath = src.substring(0, lastDot);
    const currentExt = src.substring(lastDot + 1);
    if (currentExt === format) return src;
    // Special handling: convert before image to after‑webp
    if (format === 'webp' && src.includes('/before/')) {
        return src
            .replace('/before/', '/after-webp/')
            .replace(/\.[^.]+$/, '.webp');
    }
    // Otherwise, assume alternate formats exist with the same base name
    return `${basePath}.${format}`;
}

const originalFormat = src.split('.').pop()?.toLowerCase() || 'jpg';
const useFormats = formats.length > 0
    ? formats
    : originalFormat === 'avif'
        ? ['avif', 'webp', 'jpg']
        : originalFormat === 'webp'
            ? ['webp', 'jpg']
            : ['avif', 'webp', originalFormat as any];
