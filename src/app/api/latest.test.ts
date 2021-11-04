import client from './client';
import latest from './latest';
import latestData from './latest.json';

describe('latest', () => {
  it('should return current exchange rates as a key value pair', (done) => {
    client.get = jest.fn().mockReturnValue(Promise.resolve(latestData));

    latest().then((rates) => {
      expect(rates['USD']).toBe(1.154968);
      done();
    });
  });
});
