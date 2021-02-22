import { ComponentType } from 'react';

// 组件列表类型
export type ComponentsType = Record<string, ComponentType<any>>;

// 组件列表
let _components: ComponentsType = {};

/**
 * 设置 components
 */
export function setComponents(components: ComponentsType = {}) {
  _components = Object.assign(_components, components);
}

/**
 * 设置单个 component
 */
export function setComponent(name: string, component: ComponentType<any>) {
  _components[name] = component;
}

/**
 * 获取 components
 */
export function getComponents() {
  return _components;
}

/**
 * 获取单个 component
 */
export function getComponent(name: string) {
  return _components[name];
}

/**
 * 清除 components
 */
export function clearComponents() {
  _components = {};
}
