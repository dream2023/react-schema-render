---
order: 4
---

# 自定义装饰器

所谓自定义装饰器是指在每个组件外部包裹上一层组件，例如在每个 `my-descriptions` 组件外部加上一个 `Card`，我们可以这样做：

## 1、定义组件映射

```js | pure
import { Descriptions } from 'antd';

// 组件映射
const components = {
  'my-descriptions': Descriptions,
};

// 传递 components
setComponents(components);
```

## 2、创建装饰器组件

```jsx | pure
// children 为转换后的组件，schema 是原 json 对象
export const componentDecorator = ({ children, schema }) => {
  // 以下逻辑是，当为 my-descriptions 组件时，给他加一层 Card 组件，否则就是原组件
  return schema.component === 'my-descriptions' ? (
    <Card hoverable>{node}</Card>
  ) : (
    node
  );
};
```

## 3、传递配置

```js | pure
import { setComponentDecorator } from 'react-schema-render';

setComponentDecorator(componentDecorator);
```

## 完整 Demo

从上述 Demo 来看，已经 `descriptions` 组件外面已经包裹了一层 `Card` 组件。

```jsx
import React from 'react';
import { Descriptions } from 'antd';
import { setComponents, SchemaRender } from 'react-schema-render';
import './componentDecorator.js';

// 组件映射
const components = {
  'my-descriptions': Descriptions,
};

setComponents(components);

// 组件测试
const App = () => {
  const schema = {
    component: 'my-descriptions',
    title: 'User Info',
    children: (
      <>
        <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item label="Remark">empty</Descriptions.Item>
        <Descriptions.Item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </>
    ),
  };

  return <SchemaRender schema={schema}></SchemaRender>;
};

export default App;
```

这样就完成了一个装饰器。
