import { expect } from 'chai';
import { bar, barAsync } from '../prototype_testing/index.js';

describe('bar', () => {
    it('sync function returns true', () => {
        const result = bar();
        expect(result).to.be.true;
    });

    it('async function returns true', async () => {
        const result = await barAsync();
        expect(result).to.be.true;
    });
});