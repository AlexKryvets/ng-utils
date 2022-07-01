interface Deferred {
    resolve: (value?: unknown) => void;
    reject: () => void;
    promise: Promise<any>;
}

export function defer(): Deferred {
    const deferred: Deferred = {
        resolve: (value?: unknown) => {
        }, reject: () => {
        }, promise: new Promise(() => {})
    };
    deferred.promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });
    return deferred;
}
