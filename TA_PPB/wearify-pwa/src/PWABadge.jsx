import { useRegisterSW } from 'virtual:pwa-register/react';

function PWABadge() {
    // Check for updates every hour
    const period = 60 * 60 * 1000;

    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW(swUrl, r) {
            if (period <= 0) return;
            if (r?.active?.state === 'activated') {
                registerPeriodicSync(period, swUrl, r);
            } else if (r?.installing) {
                r.installing.addEventListener('statechange', (e) => {
                    const sw = e.target;
                    if (sw.state === 'activated') registerPeriodicSync(period, swUrl, r);
                });
            }
        },
    });

    function close() {
        setOfflineReady(false);
        setNeedRefresh(false);
    }

    return (
        <div className="fixed bottom-0 right-0 m-4 z-50" role="alert" aria-labelledby="toast-message">
            {(offlineReady || needRefresh) && (
                <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-4 min-w-[320px] max-w-md animate-slide-up">
                    <div className="mb-3">
                        {offlineReady ? (
                            <span id="toast-message" className="text-sm text-slate-700">
                                ✅ App ready to work offline
                            </span>
                        ) : (
                            <span id="toast-message" className="text-sm text-slate-700">
                                🔄 New content available, click reload to update.
                            </span>
                        )}
                    </div>
                    <div className="flex gap-2 justify-end">
                        {needRefresh && (
                            <button
                                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md transition-colors"
                                onClick={() => updateServiceWorker(true)}
                            >
                                Reload
                            </button>
                        )}
                        <button
                            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium rounded-md transition-colors"
                            onClick={() => close()}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PWABadge;

/**
 * Register periodic sync to check for updates
 */
function registerPeriodicSync(period, swUrl, r) {
    if (period <= 0) return;

    setInterval(async () => {
        if ('onLine' in navigator && !navigator.onLine) return;

        const resp = await fetch(swUrl, {
            cache: 'no-store',
            headers: {
                cache: 'no-store',
                'cache-control': 'no-cache',
            },
        });

        if (resp?.status === 200) await r.update();
    }, period);
}