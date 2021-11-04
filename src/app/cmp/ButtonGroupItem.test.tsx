import { mount, ReactWrapper } from 'enzyme';
import ButtonGroupItem from './ButtonGroupItem';

describe('ButtonGroupItem', () => {
  let wrapper: ReactWrapper;

  it('should be disabled', () => {
    wrapper = mount(
      <ButtonGroupItem value={'USD'} disabled>
        USD
      </ButtonGroupItem>,
    );

    expect(wrapper.find('li').at(0).hasClass('disabled')).toBeTruthy();
  });
});
