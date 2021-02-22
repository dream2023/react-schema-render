import React, { FC } from 'react';

import {
  SchemaRender,
  clearParsers,
  setComponent,
  clearComponents,
  setComponentDecorator,
  ComponentDecoratorType,
  clearComponentDecorator,
} from '../src';
import { render, screen } from '@testing-library/react';

describe('SchemaRender', () => {
  afterEach(() => {
    clearParsers();
    clearComponents();
    clearComponentDecorator();
  });

  test('基本使用', () => {
    const schema = {
      component: 'div',
      className: 'test',
      children: 'content',
    };
    render(<SchemaRender schema={schema}></SchemaRender>);
    const ele = screen.getByText('content');

    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass('test');
  });

  test('数组', () => {
    const schema = [
      {
        component: 'div',
        className: 'test1',
        key: 'test1',
        children: 'content1',
      },
      {
        component: 'div',
        className: 'test2',
        key: 'test2',
        children: 'content2',
      },
    ];
    render(<SchemaRender schema={schema}></SchemaRender>);
    const ele1 = screen.getByText('content1');
    const ele2 = screen.getByText('content2');

    expect(ele1).toBeInTheDocument();
    expect(ele2).toBeInTheDocument();
    expect(ele1).toHaveClass('test1');
    expect(ele2).toHaveClass('test2');
  });

  test('设置映射关系', () => {
    const MyDiv: FC<{ id?: string }> = ({ id }) => {
      return <div data-testid={id}>my div</div>;
    };

    setComponent('my-dev', MyDiv);
    const schema = {
      component: 'my-dev',
      id: 'div1',
    };
    render(<SchemaRender schema={schema}></SchemaRender>);
    const ele = screen.getByText('my div');

    expect(ele).toBeInTheDocument();
    expect(ele).toHaveAttribute('data-testid', 'div1');
  });

  test('设置装饰器', () => {
    const Decorator: ComponentDecoratorType = ({ schema, children }) => {
      return <div className="wrapper">{children}</div>;
    };
    setComponentDecorator(Decorator);

    const schema = {
      component: 'div',
      className: 'test',
      children: 'content',
    };
    render(<SchemaRender schema={schema}></SchemaRender>);
    const ele = screen.getByText('content');
    expect(ele.parentNode).toBeInTheDocument();
    expect(ele.parentNode).toHaveClass('wrapper');
  });

  test('children 深度', () => {
    const schema = {
      component: 'div',
      className: 'test',
      children: {
        component: 'div',
        className: 'test2',
        children: {
          component: 'div',
          className: 'test3',
          children: 'test content',
        },
      },
    };
    render(<SchemaRender schema={schema}></SchemaRender>);
    const ele = screen.getByText('test content');

    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass('test3');
    expect(ele.parentNode).toHaveClass('test2');
    expect(ele.parentNode.parentNode).toHaveClass('test');
  });

  test('不传递 schema 时', () => {
    render(<SchemaRender></SchemaRender>);
    expect(window.document.body.innerHTML).toContain('<div></div>');
  });
});
