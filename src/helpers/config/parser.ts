// schema 解析器类型
export type SchemaParserType = (schema: Record<any, any>) => any;

// schema 解析器
let _schemaParsers: SchemaParserType[] = [];

// 设置 parsers
export function setParsers(parsers: SchemaParserType[]) {
  _schemaParsers = _schemaParsers.concat(parsers);
}

// 设置 parser
export function setParser(parser: SchemaParserType) {
  _schemaParsers.push(parser);
}

// 获取解析器
export function getParsers() {
  return _schemaParsers;
}

// 清除 parsers
export function clearParsers() {
  _schemaParsers = [];
}
