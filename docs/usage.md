---
order: 2
---

# 基础使用

在查看下面说明前，建议先看一下 [Schema To React 规范](/standard)。

## 配置说明

### 通过 SchemaProvider 配置

```jsx | pure
import { SchemaProvider } from 'react-schema-render';
// components 为 组件映射关系
<SchemaProvider components={components}></SchemaProvider>;
```

### 通过函数配置

如果组件是全局统一，我们可以通过配置函数来建立映射关系。

#### `setComponent` 设置单个组件映射

```js | pure
import { Form } from 'antd';
import { setComponent } from 'react-schema-render';
setComponent('form', Form);
```

#### `setComponents` 设置多个组件映射

> 多次调用之间是 merge 的关系。

```js | pure
import { Form, Button } from 'antd';
import { setComponents } from 'react-schema-render';
setComponents({ form: Form, btn: Button });
```

#### `clearComponent` 清除映射

`setComponent` 和 `setComponents` 是多次调用是 merge 的关系，想要清除，就需要调用 `clearComponent`：

```js | pure
import { clearComponent } from 'react-schema-render';

clearComponent();
```

## 渲染说明

> 为了示例保持示例的隔离，以下使用 `SchemaProvider` 来做组件映射配置。

### 渲染对象

```jsx
import React from 'react';
import { Input } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { SchemaRender, SchemaProvider } from 'react-schema-render';

const App = () => {
  return (
    <SchemaProvider components={{ input: Input }}>
      <SchemaRender
        schema={{
          component: 'input',
          addonAfter: {
            component: SettingOutlined,
          },
          defaultValue: 'mysite',
        }}
      />
    </SchemaProvider>
  );
};
export default App;
```

### 渲染数组

```jsx
import React from 'react';
import { SchemaRender } from 'react-schema-render';

const App = () => {
  return (
    <SchemaRender
      schema={[
        {
          component: 'div',
          key: 'div1',
          children: 'Hello World',
        },
        {
          component: 'div',
          key: 'div2',
          children: '你好，世界。',
        },
      ]}
    />
  );
};
export default App;
```

### 混合渲染

虽然不推荐，但如果是数组，其实子项里既可以有 schema 对象，又可以有 jsx 或者字符串、数字等形式。

```jsx
import React from 'react';
import { Card, Alert } from 'antd';
import { SchemaRender } from 'react-schema-render';

const App = () => {
  return (
    <SchemaRender
      schema={{
        component: Card,
        bordered: false,
        title: '混合使用',
        children: [
          { key: 'test1', component: 'div', children: '支持 schema' },
          <div key="test2">支持 JSX</div>,
          '支持字符串',
          <Alert key="test3" message="支持 React 组件" type="success" />,
        ],
      }}
    />
  );
};
export default App;
```

### 深度嵌套

```jsx
import React from 'react';
import { Layout } from 'antd';
import { SchemaRender } from 'react-schema-render';

const { Header, Footer, Sider, Content } = Layout;

const App = () => {
  return (
    <SchemaRender
      schema={{
        component: Layout,
        style: {
          textAlign: 'center',
        },
        // 1 层
        children: [
          {
            component: Header,
            children: 'Header',
            key: 'header',
            style: {
              color: '#fff',
              background: '#7dbcea',
            },
          },
          {
            component: Layout,
            style: {
              height: '150px',
              lineHeight: '150px',
            },
            // 2 层
            children: [
              {
                component: Sider,
                // 3 层
                children: 'sider',
                key: 'sider',
                style: {
                  color: '#fff',
                  background: '#3ba0e9',
                },
              },
              {
                component: Content,
                children: 'Content',
                key: 'Content',
                style: {
                  color: '#fff',
                  background: 'rgba(16, 142, 233, 1)',
                },
              },
            ],
            key: 'middle',
          },
          {
            component: Footer,
            children: 'Footer',
            key: 'footer',
            style: {
              color: '#fff',
              background: '#7dbcea',
            },
          },
        ],
      }}
    />
  );
};
export default App;
```

#### 强制对象不为 schema

schema 对象中最关键的就是 `component` 属性，它表明此对象是一个需要转换为 React 组件的对象。

但是有一种极端情况是，对象包含 `component` 属性，但是并非要转化，如下：

```jsx
import React from 'react';
import { SchemaRender } from 'react-schema-render';

const DebuggerData = ({ children }) => {
  return (
    <pre>
      <code>{JSON.stringify(children, null, 2)}</code>
    </pre>
  );
};

const App = () => {
  return (
    <SchemaRender
      schema={{
        component: DebuggerData,
        children: {
          component: 'div',
          name: 'hahaha',
          _notSchema: true,
        },
      }}
    />
  );
};

export default App;
```

此时我们可以增加 `_notSchema: true` 表明它不是一个 `shcema 对象`，不对其转换：

## 高级用法

- [自定义解析器](/parser)
- [自定义装饰器](/decorator)
