import React from 'react';
import { usePageLoader } from '../hooks/usePageLoader';

export default function PageLoader() {
    const { loaded, progress } = usePageLoader(400, 800);
    const [mount, setMount] = React.useState(true);

    React.useEffect(() => {
        if (loaded) {
            // Signal page to start entrance animations as the loader fades out
            window.__loaderDone = true;
            document.body.classList.add('page-loaded');
            window.dispatchEvent(new Event('loaderDone'));

            const t = setTimeout(() => {
                setMount(false);
            }, 300);
            return () => clearTimeout(t);
        }
    }, [loaded]);

    if (!mount) return null;

    const translateY = 100 - progress;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: loaded ? 0 : 1,
                transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: loaded ? 'none' : 'all',
            }}
        >
            <svg
                viewBox="0 0 100 100"
                width="140"
                height="140"
                style={{ overflow: 'visible' }}
            >
                <defs>
                    <mask id="fill-mask">
                        <rect
                            x="-10"
                            y="-10"
                            width="120"
                            height="120"
                            fill="white"
                            style={{
                                transform: `translateY(${translateY}%)`,
                                transformOrigin: '50px 50px',
                                transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            }}
                        />
                    </mask>
                </defs>

                {/* Faint ghost logo */}
                <g opacity="0.12">
                    <circle cx="50" cy="50" r="42" fill="#233d63" />
                    <rect x="8"    y="45.5" width="84" height="9"  fill="white" />
                    <rect x="45.5" y="8"    width="9"  height="84" fill="white" />
                    <circle cx="50" cy="50" r="18" fill="white" />
                    <circle cx="50" cy="50" r="9"  fill="#233d63" />
                </g>

                {/* Filled logo */}
                <g mask="url(#fill-mask)">
                    <circle cx="50" cy="50" r="42" fill="#233d63" />
                    <rect x="8"    y="45.5" width="84" height="9"  fill="white" />
                    <rect x="45.5" y="8"    width="9"  height="84" fill="white" />
                    <circle cx="50" cy="50" r="18" fill="white" />
                    <circle cx="50" cy="50" r="9"  fill="#233d63" />
                </g>
            </svg>
        </div>
    );
}
