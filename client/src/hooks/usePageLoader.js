import React from 'react';

/**
 * Optimized usePageLoader
 * Provides a fast, smooth, highly responsive page loading state.
 * Caps maximum display time to 800ms so users never experience long waits.
 */
export function usePageLoader(minDisplayMs = 400, maxTimeoutMs = 800) {
    const [loaded, setLoaded] = React.useState(false);
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        let cancelled = false;
        const startTime = Date.now();

        // Fast, fluid progress ticker
        const interval = setInterval(() => {
            if (cancelled) return;
            setProgress((prev) => {
                if (prev >= 92) return prev;
                return prev + Math.floor(Math.random() * 20 + 15);
            });
        }, 40);

        const finish = () => {
            if (cancelled) return;
            clearInterval(interval);
            setProgress(100);

            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, minDisplayMs - elapsed);
            setTimeout(() => {
                if (!cancelled) setLoaded(true);
            }, remaining);
        };

        const trackImages = () => {
            // Track key hero images, ignore unsplash external avatars or lazy loaded elements
            const criticalImgs = Array.from(document.querySelectorAll('img')).filter(
                (img) => !img.src.includes('unsplash.com') && img.getAttribute('loading') !== 'lazy'
            );

            if (criticalImgs.length === 0) {
                finish();
                return;
            }

            let resolved = 0;
            const total = criticalImgs.length;

            const onResolve = () => {
                resolved += 1;
                if (resolved >= total) finish();
            };

            criticalImgs.forEach((img) => {
                if (img.complete) {
                    onResolve();
                } else {
                    img.addEventListener('load', onResolve, { once: true });
                    img.addEventListener('error', onResolve, { once: true });
                }
            });
        };

        const raf = requestAnimationFrame(() => {
            trackImages();
        });

        // Strict fallback cap: force finish in max 800ms under any network conditions
        const hardTimeout = setTimeout(() => {
            finish();
        }, maxTimeoutMs);

        return () => {
            cancelled = true;
            clearInterval(interval);
            cancelAnimationFrame(raf);
            clearTimeout(hardTimeout);
        };
    }, [minDisplayMs, maxTimeoutMs]);

    return { loaded, progress };
}
