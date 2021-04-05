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
  ...resetProps
}) => {
  return (
    <SchemaRenderContext.Provider
      value={{ components, componentDecorator, parsers, ...resetProps }}
    >
      {children}
    </SchemaRenderContext.Provider>
  );
};

export default SchemaProvider;
