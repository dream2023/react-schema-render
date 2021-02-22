import { createElement, Fragment, ReactElement } from 'react';
import { baseSchemaParser } from './baseParser';
import { getComponentDecorator, getParsers } from './config';

// schema对象转为组件
export function objectSchemaToComponent(schema: Record<any, any>) {
  // 先通过自定义 parsers 做处理
  const res = getParsers().reduce((acc, parser) => parser(acc), schema);

  // 然后添加装饰器
  const componentDecoratorFn = getComponentDecorator();
  if (componentDecoratorFn) {
    // 如果有装饰器，用装饰器做一层封装
    return componentDecoratorFn({ schema, children: baseSchemaParser(res) });
  }

  // 最后通过基础的 parser 做解析
  return baseSchemaParser(res);
}

// 将数组对象转组件
export function arraySchemaToComponent(
  arr: Record<any, any>[],
): ReactElement<any, any> {
  return createElement(
    Fragment,
    null,
    arr.map(item => objectSchemaToComponent(item)),
  );
}
