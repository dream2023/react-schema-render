// 函数，接受一个 schema 对象作为参数
export function classParser(schema) {
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
