import { setParser } from 'react-schema-render';

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

setParser(propsParser);
