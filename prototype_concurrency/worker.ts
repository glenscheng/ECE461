const { parentPort } = require('worker_threads');

// Worker function that computes something
parentPort?.on('message', (params) => {
    const begin = Date.now();

    // PARSE PARAMETERS
    const { data, info } = params;
    console.log(data, info);
    
    // COMPUTE SOMETHING
    let result = 0;
    for (let i = 0; i <= data; i++) {
        result += i;
    }

    const end = Date.now();
    // RETURN SOMETHING
    parentPort?.postMessage({
        score: result,
        latency: end - begin // in ms
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
