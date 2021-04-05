import { ReactElement } from 'react';
import { SchemaRenderContextProps } from '../SchemaRenderContext';

// 组件装饰器类型
export type ComponentDecoratorType = ({
  children,
  schema,
  context,
}: {
  children: ReactElement<any, any>;
  schema: Record<any, any>;
  context: SchemaRenderContextProps;
}) => ReactElement<any, any>;

// 组件装饰器
let _componentDecorator: ComponentDecoratorType | undefined;

// 设置组件装饰器
export function setComponentDecorator(
  componentDecorator: ComponentDecoratorType,
) {
  _componentDecorator = componentDecorator;
}

// 获取组件装饰器
export function getComponentDecorator() {
  return _componentDecorator;
}

// 删除
export function clearComponentDecorator() {
  _componentDecorator = undefined;
}
