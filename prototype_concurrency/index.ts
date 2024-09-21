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
    const busFactorWorker = runWorker(1, "bus factor");
    const correctnessWorker = runWorker(2, "correctness");
    const rampUpWorker = runWorker(3, "ramp up");
    const responsivenessWorker = runWorker(4, "responsiveness");
    const licenseWorker = runWorker(5, "license");

    // WAIT FOR THE WORKERS TO ALL FINISH
    const results = await Promise.all([busFactorWorker, correctnessWorker, rampUpWorker, responsivenessWorker, licenseWorker]);

    // PARSE RESULTS
    let busFactorResults = results[0];
    let correctnessResults = results[1];
    let rampUpResults = results[2];
    let responsivenessResults = results[3];
    let licenseResults = results[4];

    console.log('Bus factor results:', busFactorResults);
    console.log('Correctness results:', correctnessResults);
    console.log('Ramp up results:', rampUpResults);
    console.log('Responsiveness results:', responsivenessResults);
    console.log('License results:', licenseResults);

    return;
}

main().catch(console.error);
