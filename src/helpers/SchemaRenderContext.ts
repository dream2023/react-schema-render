import { createContext } from 'react';
import {
  ComponentsType,
  SchemaParserType,
  ComponentDecoratorType,
} from './config';

export interface SchemaRenderContextProps {
  components?: ComponentsType;
  componentDecorator?: ComponentDecoratorType;
  parsers?: SchemaParserType[];
  [index: string]: any;
}

export const SchemaRenderContext = createContext<SchemaRenderContextProps>({});

export default SchemaRenderContext;
