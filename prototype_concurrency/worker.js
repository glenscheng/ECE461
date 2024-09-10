var parentPort = require('worker_threads').parentPort;
// Worker function that computes something
parentPort === null || parentPort === void 0 ? void 0 : parentPort.on('message', function (params) {
    var data = params.data, string = params.string;
    console.log(data, string);
    var result = 0;
    for (var i = 0; i <= data; i++) {
        result += i;
    }
    parentPort === null || parentPort === void 0 ? void 0 : parentPort.postMessage({
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
