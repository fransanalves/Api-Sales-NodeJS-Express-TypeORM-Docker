import { IParseMailTemplate } from '@config/interfaces/parseMailTemplate';
import Handlebars from 'handlebars';

export class HandlebarsMailTemplate {
  public async parse({
    template,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const parseTemplate = Handlebars.compile(template);

    return parseTemplate(variables);
  }
}
