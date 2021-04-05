---
order: 3
---

# 自定义解析器

所谓自定义解析器就是从 schema 对象到组件的解析过程，通过传递自定义的解析器（其实就是一个函数而已），实现对某些属性的特定的解析。

有了它，我们想怎么扩展解析器都是可以的，为了更好的说明，我们通过 1 个简单的示例和 1 个复杂的示例说明。

## `class` 转 `className`

### 1、需求说明

因为 `class` 是 JS 中的关键字，所以 React 使用了 `className` 代替了 `class`，如果我们想在 schema 开发过程中恢复 `class` 的用法，可以通过自定义解析器实现：

### 2、parser 实现

最开始说明中也提到了 `parser` 实际就是一个函数，其被注入了 `schema` 作为参数，所以我们可以这样做：

```js | pure
// 函数，接受一个 schema 对象作为参数
function classParser(schema) {
  // 判断是否有 class 属性
  if (schema.class) {
    // 如果有，则将其赋值给 className
    schema.className = schema.class;
    // 并删除 class 属性
    delete schema.class;
  }

  // 最后一定要返回修改后的 schema 对象
  return schema;
}
```

### 3、配置

```jsx | pure
<SchemaProvider parsers={[classParser]}></SchemaProvider>
```

和 `components` 一样，解析器也支持函数配置。

```js | pure
setParser(classParser);
```

### 4、使用

```jsx
// 组件测试
import React from 'react';
import { classParser } from './classParser.js';
import { SchemaRender, SchemaProvider } from 'react-schema-render';

const App = () => {
  const schema = {
    component: 'div',
    class: 'ant-alert ant-alert-success ant-alert-no-icon',
    children: 'div content',
  };

  return (
    <SchemaProvider parsers={[classParser]}>
      <SchemaRender schema={schema}></SchemaRender>
    </SchemaProvider>
  );
};

export default App;
```

从上面中我们看到，其成功的应用了 `foo` 样式。

## 默认值功能实现

### 1、需求说明

我们在日常开发过程中，经常会碰到有些组件的属性整个工程都是相同的（例如 upload 组件的上传地址），但是每次使用都要重复写，希望能实现一个全局配置，配置完后，组件在全局都拥有相应的默认值。

### 2、设置组件映射

这一步是基础，[使用说明](/useage) 章节已经介绍过，具体实现如下：

```js | pure
import { Button, Upload } from 'antd';
import { setComponents } from 'react-schema-render';

// 组件映射
const components = {
  btn: Button,
  upload: Upload,
};

// 传递配置
setComponents(components);
```

### 3、实现 parser

```js | pure
// 默认值对象
const componentsDefaultProps = {
  // upload 组件的默认属性
  upload: {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: { authorization: 'authorization-text' },
  },

  // button 组件的默认属性
  btn: {
    type: 'primary',
  },
};

/**
 * 自定义的 schema 解析器
 * @param {object} schema 由内部传过来的 schema，你可以做自定义的加工
 */
export const propsParser = (schema = {}) => {
  // 如果 component 是字符串且 componentsProp 中存在（说明定义过这个组件的默认值）
  if (
    typeof schema.component === 'string' &&
    typeof componentsDefaultProps[schema.component] === 'object'
  ) {
    // 合并默认值和自定义的schema
    return { ...componentsDefaultProps[schema.component], ...schema };
  }

  return schema;
};
```

### 4、传递 parser

```js | pure
// 传递 parser
setParser(propsParser);
```

上面是为了好演示，其实更好的做法是再做一层封装 `(componentsDefaultProps) => (schema) => {//...}`，然后 `setParser(schemaParser(componentsDefaultProps))`

### 完整 Demo

```jsx
import React from 'react';
import { Button, Upload } from 'antd';
import './propsParser.js';
import { setComponents, SchemaRender } from 'react-schema-render';

const components = {
  btn: Button,
  upload: Upload,
};
setComponents(components);

// 组件测试
const App = () => {
  const schema = {
    component: 'upload',
    // 这里并没有定义 action 和 headers 属性
    name: 'file',
    children: {
      component: 'btn',
      children: 'Click to Upload',
    },
  };
  return <SchemaRender schema={schema}></SchemaRender>;
};

export default App;
```

从 Demo 表现来看，首先 `Button` 组件有了 `type="primary"` 的默认值，其次当我们点击上传是，请求地址为 **https://www.mocky.io/v2/5cc8019d300000980a055e76** 说明默认值功能实现成功。

这样就完成了一个可以处理默认值的解析器。

## API 说明

- `setParser` 接受一个函数，函数接受 schema 作为参数，内部可以对 schema 做自定义处理，最后需要返回处理后的 schema；
- `setParser` 是可以调用多次的，也就是可以可以设置多个 `parser` 的，在做 schema 解析的时回依次调用；
- 如果想一次性设置多个，也可以使用 `setParsers([fn1, fn2])`，其接受一个数组，数组里每一项都是一个解析函数。
