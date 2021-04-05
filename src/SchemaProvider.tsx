import React, { FC } from 'react';
import {
  SchemaRenderContext,
  SchemaRenderContextProps,
} from './helpers/SchemaRenderContext';

export const SchemaProvider: FC<SchemaRenderContextProps> = ({
  children,
  components,
  parsers,
  componentDecorator,
}) => {
  return (
    <SchemaRenderContext.Provider
      value={{ components, componentDecorator, parsers }}
    >
      {children}
    </SchemaRenderContext.Provider>
  );
};

export default SchemaProvider;
