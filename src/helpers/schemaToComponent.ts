import { baseSchemaParser } from './baseParser';
import { getComponentDecorator, getParsers } from './config';
import { createElement, Fragment, ReactElement } from 'react';
import { SchemaRenderContextProps } from './SchemaRenderContext';

// schema对象转为组件
export function objectSchemaToComponent(
  schema: Record<any, any>,
  context: SchemaRenderContextProps = {},
) {
  // 先通过自定义 parsers 做处理
  const res = (context.parsers || getParsers()).reduce(
    (acc, parser) => parser(acc, context),
    schema,
  );

  // 然后添加装饰器
  const componentDecoratorFn =
    context.componentDecorator || getComponentDecorator();
  if (componentDecoratorFn) {
    // 如果有装饰器，用装饰器做一层封装
    return componentDecoratorFn({
      schema,
      children: baseSchemaParser(res, context),
      context,
    });
  }

  // 最后通过基础的 parser 做解析
  return baseSchemaParser(res, context);
}

// 将数组对象转组件
export function arraySchemaToComponent(
  arr: Record<any, any>[],
  context: SchemaRenderContextProps = {},
): ReactElement<any, any> {
  return createElement(
    Fragment,
    null,
    arr.map(item => objectSchemaToComponent(item, context)),
  );
}
