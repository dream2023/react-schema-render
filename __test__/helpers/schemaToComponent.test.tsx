import React from 'react';
import {
  clearParsers,
  SchemaParserType,
  setComponentDecorator,
  arraySchemaToComponent,
  clearComponentDecorator,
  objectSchemaToComponent,
  setParsers,
  ComponentDecoratorType,
} from '../../src';

describe('schemaToComponent', () => {
  afterEach(() => {
    clearParsers();
    clearComponentDecorator();
  });

  test('基本使用方式', () => {
    expect(
      objectSchemaToComponent({ component: 'div', 'data-test': '123' }),
    ).toEqual(<div data-test="123"></div>);
  });

  test('自定义 parser', () => {
    const CustomParser: SchemaParserType = schema => {
      if (typeof schema['data-num'] === 'number') {
        schema['data-num'] += 100;
      }
      return schema;
    };

    const CustomParser2: SchemaParserType = schema => {
      if (typeof schema['data-num2'] === 'number') {
        schema['data-num2'] += 100;
      }

      return schema;
    };

    setParsers([CustomParser, CustomParser2]);

    expect(
      objectSchemaToComponent({ component: 'div', 'data-num': 1 }),
    ).toEqual(<div data-num={101}></div>);
    expect(
      objectSchemaToComponent({
        component: 'div',
        'data-num': 1,
        'data-num2': 2,
      }),
    ).toEqual(<div data-num={101} data-num2={102}></div>);
  });

  test('自定义装饰器', () => {
    const Decorator: ComponentDecoratorType = ({ children }) => {
      return <div className="wrapper">{children}</div>;
    };
    setComponentDecorator(Decorator);

    expect(
      objectSchemaToComponent({
        component: 'div',
        children: {
          component: 'video',
          poster: 'https://bar.com',
        },
      }),
    ).toEqual(
      <div className="wrapper">
        <div>
          <div className="wrapper">
            <video poster="https://bar.com"></video>
          </div>
        </div>
      </div>,
    );
  });

  test('数组', () => {
    expect(
      arraySchemaToComponent([
        {
          component: 'div',
          className: 'test1',
          key: 'test1',
        },
        {
          component: 'div',
          className: 'test2',
          key: 'test2',
        },
      ]),
    ).toEqual(
      <>
        <div key="test1" className="test1"></div>
        <div key="test2" className="test2"></div>
      </>,
    );
  });
});
