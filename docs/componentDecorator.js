import { Card } from 'antd';
import { setComponentDecorator } from 'react-schema-render';

// children 为转换后的组件，schema 是原 json 对象
export const componentDecorator = ({ children, schema }) => {
  // 以下逻辑是，当为 my-descriptions 组件时，给他加一层 Card 组件，否则就是原组件
  return schema.component === 'my-descriptions' ? (
    <Card hoverable>{children}</Card>
  ) : (
    children
  );
};

setComponentDecorator(componentDecorator);
