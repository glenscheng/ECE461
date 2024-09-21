import { Worker } from 'worker_threads';

// Function to create and manage worker threads
export function runWorker(data: number, info: string): Promise<number> {
    return new Promise((resolve, reject) => {
        // PATH TO WORKER SCRIPT
        const worker = new Worker('./worker.ts');
        
        // SEND DATA TO WORKER AND START THE WORKER
        worker.postMessage({data, info});

        // GET THE WORKER'S RESULT
        worker.on('message', (result) => {
            resolve(result);
            worker.terminate();
        });

        // HANDLE ERRORS
        worker.on('error', (error) => {
            reject(error);
            worker.terminate();
        });

        // EXIT
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
}

// Example: running multiple workers
const main = async () => {
    // CREATE ALL WORKERS
    const worker1 = runWorker(1, "test1");
    const worker2 = runWorker(2, "test2");
    const worker3 = runWorker(3, "test3");
    const worker4 = runWorker(4, "test4");
    const worker5 = runWorker(5, "test5");

    // WAIT FOR THE WORKERS TO ALL FINISH
    const results = await Promise.all([worker1, worker2, worker3, worker4, worker5]);

    console.log('Results from workers:', results);

    return;
}

main().catch(console.error);
