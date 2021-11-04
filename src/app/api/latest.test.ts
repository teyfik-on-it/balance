import latest from './latest';
import mockLatest from './mockLatest';

describe('latest', () => {
  it('should return current exchange rates as a key value pair', (done) => {
    mockLatest();
    latest().then((rates) => {
      expect(rates['USD']).toBe(1.154968);
      done();
    });
  });
});
