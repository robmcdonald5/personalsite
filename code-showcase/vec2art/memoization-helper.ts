export function memoize<T extends (...args: any[]) => any>(
    func: T,
    keyGenerator?: (...args: Parameters<T>) => string
): T & { cache: Map<string, ReturnType<T>>; clearCache: () => void } {
    const cache = new Map<string, ReturnType<T>>();
    const memoizedFunc = (...args: Parameters<T>): ReturnType<T> => {
        const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key)!;
        }
        const result = func(...args);
        cache.set(key, result);
        return result;
    };
    (memoizedFunc as any).cache = cache;
    (memoizedFunc as any).clearCache = () => cache.clear();
    return memoizedFunc as any;
}
