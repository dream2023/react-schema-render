---
title: 规范
order: 1
---

# Schema To Component 规范

## 什么是 `Schema To Component`？

`Schema To Component` 就是将 `Schema` 对象转为 `React` 组件（如果是 Vue 的实现，就转为 Vue 组件）。

## 什么是 Schema？

`Schema` 对象其实就是普通 JS 对象，但是有一定的约束，其和具体的前端框架无关，无论是通过 `React` 还是通过 `Vue` 都是可以实现的。

## 什么是 Schema 规范？

前面说 `Schema` 是对普通 JS 对象的约束，规范就是这种约束的说明。以下是我关于 `Schema To Component` 制定的一套规范：

- 规范 1：schema 对象必须含有 `component` 属性，其值代表组件；
- 规范 2：`component` 属性值可以为一个 **字符串** 或者一个 **组件** 引用；
- 规范 3：其他属性均为 component 对应 **组件的属性**。
- 规范 4：若组件某些属性值仍为 `组件` 类型时，我们依然可以使用 schema 对象作为属性值，依然会被正确转换；
- 规范 5：`children` 作为组件的子元素，只要原组件支持，可以任意层级嵌套。

以一个 React 举例：

如果目标组件为：

```jsx | pure
// 目标组件
<Input addonAfter={<Button>我是一个Button组件</Button>} defaultValue="foo" />
```

我们就可以这样写 schema：

```js | pure
// schema 对象
{
  component: "input",
  defaultValue: "foo",
  addonAfter: { component: Button, children: '我是一个Button组件' }
}
```

解读：

- 规范 1：`{component: "input", ...}` 说明这是一个 `input` 组件;
- 规范 2：`{component: "input", ...}` 中 component 的值为 `string` 类型，而 `component: Button` component 的值为 `组件` 类型，说明要同时支持字符串和 React 组件类型；
- 规范 3：`defaultValue` 和 `addonAfter` 均为 `input` 组件的属性；
- 规范 4：`addonAfter` 属性的类型为组件，所以依然可以使用 `{ component: Button, children: '我是一个Button组件' }` 的方式。
- 规范 5：`children` 属性是组件的内容部分，支持深度嵌套，类型方面支持字符串、数字、组件和 schema 等。

## 规范对 React 组件的好处

可以做到 **零成本接入**，既无需对原组件做任何改变或者包裹成高阶组件即可接入；

## 规范的实现

具体可以参考 [react-schema-render](https://dream2023.gitee.io/react-schema-render/)
