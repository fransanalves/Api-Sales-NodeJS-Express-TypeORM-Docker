import Handlebars from 'handlebars';
import fs from 'fs';
import { IParseMailTemplate } from '@config/interfaces/parseMailTemplate';

export class HandlebarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = Handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
