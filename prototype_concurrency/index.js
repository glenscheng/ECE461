"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runWorker = runWorker;
exports.main = main;
var worker_threads_1 = require("worker_threads");
// Function to create and manage worker threads
function runWorker(data, string) {
    return new Promise(function (resolve, reject) {
        // Path to worker script
        var worker = new worker_threads_1.Worker('./worker.ts');
        //
        // send data to worker
        worker.postMessage({ data: data, string: string });
        //
        // Resolve the promise with the worker's result
        worker.on('message', function (result) {
            resolve(result);
        });
        //
        // Handle errors and exit
        worker.on('error', reject);
        worker.on('exit', function (code) {
            if (code !== 0) {
                reject(new Error("Worker stopped with exit code ".concat(code)));
            }
        });
        //
    });
}
// Example: running multiple workers
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var worker1, worker2, worker3, worker4, worker5, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    worker1 = runWorker(1, "test1");
                    worker2 = runWorker(2, "test2");
                    worker3 = runWorker(3, "test3");
                    worker4 = runWorker(4, "test4");
                    worker5 = runWorker(5, "test5");
                    return [4 /*yield*/, Promise.all([worker1, worker2, worker3, worker4, worker5])];
                case 1:
                    results = _a.sent();
                    console.log('Results from workers:', results);
                    return [2 /*return*/];
            }
        });
    });
}
// Only run main if this file is being run directly
if (require.main === module) {
    main().catch(console.error);
}
