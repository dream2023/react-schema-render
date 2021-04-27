import classnames from 'classnames';

// 函数，接受一个 schema 对象作为参数
export function classNameParser(schema) {
  // 判断是否有 class 属性
  if (schema.className) {
    // 使用 classnames 库转换 className
    schema.className = classnames(schema.className);
  }

  // 最后一定要返回修改后的 schema 对象
  return schema;
}
