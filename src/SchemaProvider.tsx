import React, { FC } from 'react';
import {
  SchemaRenderContext,
  SchemaRenderContextProps,
} from './helpers/SchemaRenderContext';

export const SchemaProvider: FC<SchemaRenderContextProps> = ({
  children,
  components,
  schemaParsers,
  componentDecorator,
}) => {
  return (
    <SchemaRenderContext.Provider
      value={{ components, componentDecorator, schemaParsers }}
    >
      {children}
    </SchemaRenderContext.Provider>
  );
};

export default SchemaProvider;
