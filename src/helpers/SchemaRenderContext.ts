import { createContext } from 'react';
import {
  ComponentsType,
  SchemaParserType,
  ComponentDecoratorType,
} from './config';

export interface SchemaRenderContextProps {
  components?: ComponentsType;
  componentDecorator?: ComponentDecoratorType;
  schemaParsers?: SchemaParserType[];
}

export const SchemaRenderContext = createContext<SchemaRenderContextProps>({});

export default SchemaRenderContext;
