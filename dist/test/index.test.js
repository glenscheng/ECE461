import { isEven } from '../prototype_testing/index';
describe('isEven function', () => {
    test('should return true for even numbers', () => {
        expect(isEven(2)).toBe(true);
        expect(isEven(0)).toBe(true);
        expect(isEven(-4)).toBe(true);
    });
    test('should return false for odd numbers', () => {
        expect(isEven(1)).toBe(false);
        expect(isEven(-3)).toBe(false);
        expect(isEven(99)).toBe(false);
    });
    test('should handle large numbers', () => {
        expect(isEven(1000000)).toBe(true);
        expect(isEven(1000001)).toBe(false);
    });
    test('should handle decimal numbers', () => {
        expect(isEven(2.0)).toBe(true);
        expect(isEven(2.1)).toBe(false);
    });
});
//# sourceMappingURL=index.test.js.map