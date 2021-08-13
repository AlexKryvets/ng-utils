interface Deferred {
    resolve: (value: unknown) => void;
    reject: () => void;
    promise: Promise<any> | null;
}

export function defer() {
    const deferred: Deferred = {
        resolve: (value: unknown) => {
        }, reject: () => {
        }, promise: null
    };
    deferred.promise = new Promise(function(resolve, reject) {
        deferred.resolve = resolve;
        deferred.reject = reject;
    });
    return deferred;
}
