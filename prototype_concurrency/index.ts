import { Worker } from 'worker_threads';

// Function to create and manage worker threads
export function runWorker(data: number, string: string): Promise<number> {
    return new Promise((resolve, reject) => {
        // Path to worker script
        const worker = new Worker('./worker.ts');
        //
        
        // send data to worker
        worker.postMessage({data, string});
        //

        // Resolve the promise with the worker's result
        worker.on('message', (result) => {
            resolve(result);
        });
        //

        // Handle errors and exit
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
        //
    });
}

// Example: running multiple workers
export async function main() {
    const worker1 = runWorker(1, "test1");
    const worker2 = runWorker(2, "test2");
    const worker3 = runWorker(3, "test3");
    const worker4 = runWorker(4, "test4");
    const worker5 = runWorker(5, "test5");

    const results = await Promise.all([worker1, worker2, worker3, worker4, worker5]);

    console.log('Results from workers:', results);
}

// Only run main if this file is being run directly
if (require.main === module) {
    main().catch(console.error);
}