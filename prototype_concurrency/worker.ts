const { parentPort } = require('worker_threads');

// Worker function that computes something
parentPort?.on('message', (params) => {
    // PARSE PARAMETERS
    const { data, info } = params;
    console.log(data, info);
    
    // COMPUTE SOMETHING
    let result = 0;
    for (let i = 0; i <= data; i++) {
        result += i;
    }

    // RETURN SOMETHING
    parentPort?.postMessage({
        result: result,
        timestamp: Date.now()
    });
});


/* 
For metrics:

can have one worker per metric:
- BusFactorMetricWorker
- RampUpTimeMetricWorker
- CorrectnessMetricWorker
- ResponseMetricWorker
- LicenseMetricWorker

parameters:
- class (each worker can use its respective method to calculate the metric scores)
- data needed for metric calcuations
return:
- sub-scores
- latency values
*/
