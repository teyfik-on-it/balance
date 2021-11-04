import client from './client';
import latestData from './latest.json';

const mockLatest = () => {
  client.get = jest.fn().mockReturnValue(Promise.resolve(latestData));
};

export default mockLatest;
