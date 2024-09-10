import { runWorker, main } from './index';

// Mock console.log to suppress output
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

const noop = () => {};

['log', 'warn', 'error', 'info'].forEach((method) => {
  global.console[method] = noop;
});


// Mock the Worker class
jest.mock('worker_threads', () => ({
  Worker: jest.fn().mockImplementation(() => ({
    postMessage: jest.fn(),
    on: jest.fn((event, callback) => {
      if (event === 'message') {
        setTimeout(() => callback(42), 100); // Simulate async work
      }
    }),
  })),
}));

describe('Worker Thread Tests', () => {
  test('runWorker returns expected result', async () => {
    const result = await runWorker(1, 'test');
    expect(result).toBe(42);
  });
  
  test('main function runs multiple workers', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    await main();
    expect(consoleSpy).toHaveBeenCalledWith('Results from workers:', [42, 42, 42, 42, 42]);
    consoleSpy.mockRestore();
  });
  
  test('log coverage data', () => {
    const coverageData = global.__coverage__; // Access the coverage data
    
    if (!coverageData) {
      console.log('No coverage data available.');
      return;
    }
    
    // Iterate over each file in the coverage data
    for (const filePath in coverageData) {
      const fileCoverage = coverageData[filePath];
      
      // Check if line coverage exists for the file
      const lines = fileCoverage.l;
      if (!lines) {
        console.log(`No line coverage data for ${filePath}`);
        continue;
      }
      
      // Calculate total lines and executed lines
      const totalLines = Object.keys(lines).length;
      const executedLines = Object.values(lines).filter(value => (value as number) > 0).length;
  
      // Calculate the percentage of executed lines
      const lineCoveragePercentage = (executedLines / totalLines) * 100;
      
      // Log the result
      console.log(`Line coverage for ${filePath}: ${lineCoveragePercentage.toFixed(2)}%`);
      console.log(lineCoveragePercentage);
    }
  });
  
});

afterAll(() => {
  jest.restoreAllMocks(); // Restore original console.log after tests
});