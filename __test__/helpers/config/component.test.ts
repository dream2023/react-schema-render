import {
  setComponents,
  setComponent,
  getComponents,
  getComponent,
  clearComponents,
} from '../../../src/helpers/config/component';

describe('components', () => {
  afterEach(() => {
    clearComponents();
  });

  test('setComponent', () => {
    const Form = jest.fn();
    setComponent('form', Form);
    expect(getComponents()).toEqual({ form: Form });

    // 多次使用，是合并关系
    const Input = jest.fn();
    setComponent('input', Input);
    expect(getComponents()).toEqual({ input: Input, form: Form });
  });

  test('setComponents', () => {
    const Form = jest.fn();
    setComponents({ form: Form });
    expect(getComponents()).toEqual({ form: Form });

    // 多次使用，是合并关系
    const Input = jest.fn();
    setComponents({ input: Input });
    expect(getComponents()).toEqual({ input: Input, form: Form });
  });

  test('getComponent', () => {
    const Form = jest.fn();
    const Input = jest.fn();
    setComponents({ input: Input, form: Form });
    expect(getComponent('input')).toEqual(Input);
  });
});
