import { mount, ReactWrapper } from 'enzyme';
import { Wallet } from '../reducer/wallets';
import WalletInput from './WalletInput';

describe('WalletInput', () => {
  let wrapper: ReactWrapper;
  const value = 50;
  const wallet: Wallet = {
    id: 'USD',
    symbol: '$',
    balance: 100,
  };
  const onChange = () => null;

  beforeEach(() => {
    wrapper = mount(
      <WalletInput value={value} onChange={onChange} wallet={wallet} />,
    );
  });

  it('should has a balance of 100', () => {
    expect(wrapper.find('.balance').text()).toMatch(/100/);
  });

  it('should be invalid and shaking', () => {
    wrapper.setProps({
      invalid: true,
    });
    wrapper.update();

    expect(wrapper.find('.balance').at(0).hasClass('invalid')).toBeTruthy();
    expect(wrapper.find('.balance').at(0).hasClass('shake')).toBeTruthy();
  });

  it('should be highlighted', () => {
    wrapper.setProps({
      wallet: { ...wallet },
    });

    expect(wrapper.find('.balance').at(0).hasClass('flash')).toBeTruthy();
  });
});
