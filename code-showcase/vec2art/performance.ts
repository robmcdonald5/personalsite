// Debounce function – wait delay ms after last call before invoking
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return function (this: any, ...args: any[]) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    } as T;
}

// Throttle function – invoke at most once per interval
export function throttle<T extends (...args: any[]) => any>(fn: T, interval: number): T {
    let lastCallTime = 0;
    return function (this: any, ...args: any[]) {
        const now = Date.now();
        if (now - lastCallTime >= interval) {
            lastCallTime = now;
            fn.apply(this, args);
        }
    } as T;
}

// Simple memoization helper – caches return values based on args key
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
    const cache = new Map<string, any>();
    return function (this: any, ...args: any[]) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    } as T;
}
