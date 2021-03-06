import { mount, ReactWrapper } from 'enzyme';
import ButtonGroup from './ButtonGroup';
import ButtonGroupItem from './ButtonGroupItem';

describe('ButtonGroup', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <ButtonGroup value={'USD'}>
        <ButtonGroupItem value={'USD'}>USD</ButtonGroupItem>
        <ButtonGroupItem value={'EUR'}>EUR</ButtonGroupItem>
        <ButtonGroupItem value={'GBP'}>GBP</ButtonGroupItem>
      </ButtonGroup>,
    );
  });

  it('should set USD button as active', () => {
    expect(wrapper.find('.button-group-item.active').text()).toBe('USD');
  });
});
