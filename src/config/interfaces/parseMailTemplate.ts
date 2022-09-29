import { ITemplateVariable } from './templateVariable';

export interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}
