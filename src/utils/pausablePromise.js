export function pausablePromise() {
    let resolve, reject;
    let isPaused = false;
    let isCancelled = false;
  
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
  
    const waitUntilResumed = () =>
        new Promise((res) => {
            const check = () => {
                if (!isPaused) res();
                else setTimeout(check, 50);
            };
            check();
        });
  
    return {
        promise,
        resolve: (value) => {
            if (!isCancelled) resolve(value);
        },
        reject: (err) => {
            if (!isCancelled) reject(err);
        },
        pause() {
            isPaused = true;
        },
        resume() {
            isPaused = false;
        },
        async waitIfPaused() {
            if (isPaused) await waitUntilResumed();
        },
        cancel() {
            isCancelled = true;
            reject(new Error("Cancelled"));
        },
        isPaused: () => isPaused,
        isCancelled: () => isCancelled
    };
}
  