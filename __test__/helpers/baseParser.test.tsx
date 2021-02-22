import React, { FC } from 'react';
import {
  setComponent,
  getProps,
  getPropValue,
  baseSchemaParser,
  setParsers,
} from '../../src';

describe('getPropValue', () => {
  test('prop is array', () => {
    const Input = () => <div>input</div>;
    expect(
      getPropValue(['123', [{ component: Input }, <div>123</div>]]),
    ).toEqual(['123', [<Input></Input>, <div>123</div>]]);
  });

  test('prop is schema', () => {
    const Input: FC<{ test: number }> = ({ test }) => <div>{test}</div>;
    expect(getPropValue({ component: Input, test: 123 })).toEqual(
      <Input test={123}></Input>,
    );

    expect(getPropValue({ component: 'div', style: { color: 'red' } })).toEqual(
      <div style={{ color: 'red' }}></div>,
    );
  });

  test('prop is object but not schema', () => {
    expect(getPropValue({ component: 'div', _notSchema: true })).toEqual({
      component: 'div',
    });
  });

  test('prop is others', () => {
    expect(getPropValue(123)).toEqual(123);
    expect(getPropValue('string')).toEqual('string');
    expect(getPropValue(<div>123</div>)).toEqual(<div>123</div>);
    const Component = () => <div>123</div>;
    expect(getPropValue(Component)).toEqual(Component);
  });
});

describe('getProps', () => {
  test('getProps', () => {
    expect(
      getProps({
        foo: 123,
        bar: 'string',
        zoo: { component: 'div', style: { color: 'red' } },
        test: <div>test</div>,
        arr: [
          { component: 'a', href: 'https://foo.com', children: 'foo.com' },
          123,
        ],
      }),
    ).toEqual({
      foo: 123,
      bar: 'string',
      zoo: <div style={{ color: 'red' }}></div>,
      test: <div>test</div>,
      arr: [<a href="https://foo.com">foo.com</a>, 123],
    });
  });
});

describe('baseSchemaParser', () => {
  test('component is common string', () => {
    expect(baseSchemaParser({ component: 'div' })).toEqual(<div></div>);
    expect(
      baseSchemaParser({
        component: 'div',
        className: 'test',
        children: <div>123</div>,
      }),
    ).toEqual(
      <div className="test">
        <div>123</div>
      </div>,
    );
  });

  test('component is React Node', () => {
    const Form: FC<{ className?: string }> = ({ className, children }) => (
      <div className={className}>{children}</div>
    );

    expect(baseSchemaParser({ component: Form })).toEqual(<Form></Form>);
    expect(
      baseSchemaParser({
        component: Form,
        className: 'test',
        children: <div>123</div>,
      }),
    ).toEqual(
      <Form className="test">
        <div>123</div>
      </Form>,
    );
  });

  test('component is mapping string', () => {
    const Form: FC<{ className?: string }> = ({ className, children }) => (
      <div className={className}>{children}</div>
    );

    setComponent('form', Form);

    expect(baseSchemaParser({ component: 'form' })).toEqual(<Form></Form>);
    expect(
      baseSchemaParser({
        component: 'form',
        className: 'test',
        children: <div>123</div>,
      }),
    ).toEqual(
      <Form className="test">
        <div>123</div>
      </Form>,
    );
  });

  test('component has name prop', () => {
    const Test: FC<{ name?: string }> = ({ name }) => {
      return <div>{name}</div>;
    };

    expect(baseSchemaParser({ component: Test, name: 'test' })).toEqual(
      <Test key="test" name="test"></Test>,
    );
  });
});
