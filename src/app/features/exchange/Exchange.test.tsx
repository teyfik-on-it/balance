import { mount, ReactWrapper } from 'enzyme';
import { Provider } from 'react-redux';
import mockLatest from '../../api/mockLatest';
import RateLoader from '../../cmp/RateLoader';
import { store } from '../../store';
import Exchange from './Exchange';

const flushPromises = () => new Promise(setImmediate);

describe('Exchange', () => {
  let wrapper: ReactWrapper;

  beforeEach(async () => {
    mockLatest();

    wrapper = mount(
      <Provider store={store}>
        <RateLoader>
          <Exchange />
        </RateLoader>
      </Provider>,
    );
    wrapper.update();

    await flushPromises();
  });

  it('should be loading rates', () => {
    expect(wrapper.text()).toMatch(/Please wait/);
  });

  it('should load USD and EUR as selected wallets', () => {
    expect(wrapper.find('.button-group-item.active').at(0).text()).toBe('USD');
    expect(wrapper.find('.button-group-item.active').at(1).text()).toBe('EUR');
  });

  it('should convert 1 USD to 0,865825 EUR', () => {
    wrapper
      .find('.wallet-input input')
      .at(0)
      .simulate('change', {
        target: {
          value: '1',
          focus: () => null,
        },
      });

    expect(wrapper.find('.wallet-input input').at(1).render().val()).toBe(
      '€ 0,865825',
    );
  });

  it('should switch to GBP/EUR and convert 3 GBP to 7,078218 EUR', () => {
    wrapper
      .findWhere((wrapper) => wrapper.text() === 'GBP')
      .at(0)
      .simulate('click');

    expect(wrapper.find('.button-group-item.active').at(0).text()).toBe('GBP');

    wrapper
      .find('.wallet-input input')
      .at(0)
      .simulate('change', {
        target: {
          value: '6',
          focus: () => null,
        },
      });

    expect(wrapper.find('.wallet-input input').at(1).render().val()).toBe(
      '€ 7,078218',
    );
  });

  it('should exchange 1 USD with 2 EUR', async () => {
    wrapper
      .find('.wallet-input input')
      .at(0)
      .simulate('change', {
        target: {
          value: '1',
          focus: () => null,
        },
      });

    wrapper.find('.submit').at(0).simulate('click');
    wrapper.update();

    expect(wrapper.find('.balance').at(0).text()).toBe('$ 198.9999998314');
    expect(wrapper.find('.balance').at(1).text()).toBe('€ 150.865825');
  });
});
