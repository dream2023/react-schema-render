import {
  setComponentDecorator,
  getComponentDecorator,
  clearComponentDecorator,
} from '../../../src/helpers/config/decorator';

describe('componentDecorator', () => {
  test('componentDecorator', () => {
    const Decorator = jest.fn();
    setComponentDecorator(Decorator);
    expect(getComponentDecorator()).toBe(Decorator);

    clearComponentDecorator();

    expect(getComponentDecorator()).toBeUndefined();
  });
});
