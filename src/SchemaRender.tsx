import React, { FC, memo } from 'react';
import { objectSchemaToComponent, arraySchemaToComponent } from './helpers';

export interface SchemaRenderProps {
  /**
   * Schema 对象。可以为数组或者对象。
   * 例如 { component: 'input', name: 'foo', label: 'bar' }
   */
  schema?: Record<any, any> | Record<any, any>[];
}

export const SchemaRender: FC<SchemaRenderProps> = memo(({ schema }) => {
  if (Array.isArray(schema)) return arraySchemaToComponent(schema);
  if (typeof schema === 'object') return objectSchemaToComponent(schema);
  return <></>;
});

export default SchemaRender;
