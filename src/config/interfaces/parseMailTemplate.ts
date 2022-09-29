import { ITemplateVariable } from './templateVariable';

export interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}
