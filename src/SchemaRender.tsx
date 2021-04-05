import React, { FC, memo, useContext } from 'react';
import {
  SchemaRenderContext,
  arraySchemaToComponent,
  objectSchemaToComponent,
} from './helpers';

export interface SchemaRenderProps {
  /**
   * Schema 对象。可以为数组或者对象。
   * 例如 { component: 'input', name: 'foo', label: 'bar' }
   */
  schema?: Record<any, any> | Record<any, any>[];
}

export const SchemaRender: FC<SchemaRenderProps> = memo(({ schema }) => {
  const context = useContext(SchemaRenderContext);
  if (Array.isArray(schema)) return arraySchemaToComponent(schema, context);
  if (typeof schema === 'object')
    return objectSchemaToComponent(schema, context);
  return null;
});

export default SchemaRender;
