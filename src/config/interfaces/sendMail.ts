import { IMailContact } from './mailContact';
import { IParseMailTemplate } from './parseMailTemplate';

export interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}
