import { mount } from 'enzyme';
import NumberInput from './NumberInput';

describe('NumberFormat', () => {
  const onChange = () => null;

  it('should trim last 2 digits', () => {
    expect(
      mount(<NumberInput value={0.12345678} onChange={onChange} />)
        .find('input')
        .get(0).props.value,
    ).toBe('0,123457');
  });
});
