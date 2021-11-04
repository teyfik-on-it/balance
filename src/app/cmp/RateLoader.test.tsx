import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import RateLoader from './RateLoader';

interface Store {
  rates: {
    status: string;
    error?: string;
  };
}

const mockStore = configureStore<Store>();

describe('RateLoader', () => {
  let store: MockStoreEnhanced;
  let wrapper: ReactWrapper;

  const createWrapper = (state: Store) => {
    store = mockStore(state);
    wrapper = mount(
      <Provider store={store}>
        <RateLoader>Success</RateLoader>
      </Provider>,
    );
  };

  it('should render children', () => {
    createWrapper({
      rates: {
        status: 'success',
      },
    });

    expect(wrapper.text()).toBe('Success');
  });

  it('should be at loading state', () => {
    createWrapper({
      rates: {
        status: 'pending',
      },
    });

    expect(wrapper.text()).toMatch(/Please wait/);
  });

  it('should display the specified error', () => {
    createWrapper({
      rates: {
        status: 'failure',
        error: 'Failed to load',
      },
    });

    expect(wrapper.text()).toMatch(/Failed to load/);
  });
});
