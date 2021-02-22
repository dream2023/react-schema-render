/**
 * 判断是否为 schema
 *
 * 判断的依据很简单，拥有 component 属性即可。
 * 但是为了避免极端情况，增加判断 { component: xxx, _notSchema: true } 不为 schema
 *
 * @example
 * isJsonSchema({ component: 'input', allowClear: true }) => // true
 * isJsonSchema('姓名') // => false
 * isJsonSchema({ component: 'input', _notSchema: true }) // => false
 */
export function isJsonSchema(val: any) {
  return typeof val === 'object' && val.component && !hasNotSchema(val);
}

// 是否有 notSchema
export function hasNotSchema(o: any): boolean {
  return typeof o === 'object' && '_notSchema' in o;
}
