import { createElement, ReactElement } from 'react';

import { getComponent } from './config';
import { hasNotSchema, isJsonSchema } from './util';
import { objectSchemaToComponent } from './schemaToComponent';
import { SchemaRenderContextProps } from './SchemaRenderContext';

/**
 * 从数组中获取属性值
 * @param arr
 */
export function getPropValueFromArray(arr: any[]): any[] {
  return arr.map(item => getPropValue(item));
}

/**
 * 获取单个属性的属性值
 * 分别有五种情况：
 * 1、值为数组，则继续深度递归
 * 2、值为 schema，则转为组件
 * 3、值为非 schema，则去掉 _notSchema
 * 4、值为 React 组件，则判断是否需要设置 key
 * 5、值为其他（例如数字、字符串）则直接返回
 */
export function getPropValue(val: any, context: SchemaRenderContextProps = {}) {
  if (Array.isArray(val)) {
    // 数组，则继续深度递归
    return getPropValueFromArray(val);
  } else if (isJsonSchema(val)) {
    // schema，则转为组件
    return objectSchemaToComponent(val, context);
  } else if (hasNotSchema(val)) {
    // 如果是 _notSchema 的，则需要将 _notSchema 删除（这里是通过解构赋值）
    const { _notSchema, ...res } = val;
    return res;
  }

  // 其他
  return val;
}

// 获取所有属性
export function getProps(
  props: Record<any, any>,
  context: SchemaRenderContextProps = {},
) {
  const res: Record<any, any> = {};

  // 遍历组件属性，并转换
  Object.keys(props).forEach(key => {
    const val = props[key];
    res[key] = getPropValue(val, context);
  });

  return res;
}

// Schema To Component 基础解析器
export function baseSchemaParser(
  schema: Record<any, any>,
  context: SchemaRenderContextProps = {},
): ReactElement<any, any> {
  // 将 schema 分为 component 和其他属性
  const { component, ...originProps } = schema;

  // 转换 props
  const componentProps = getProps(originProps, context);

  // 使用 name 属性作为 key 的备选项 ?
  if (componentProps.key === undefined && componentProps.name) {
    componentProps.key = componentProps.name;
  }

  // 如果 component 是字符串，则从配置中获取 components
  if (typeof component === 'string' && getComponent(component, context)) {
    return createElement(getComponent(component, context), componentProps);
  }

  // 否则直接创建
  return createElement(component, componentProps);
}
