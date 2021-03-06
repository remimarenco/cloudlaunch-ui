import { Application } from './application';


export interface Country {
  code: string;
  name: string;
}


export interface PublicService {
  slug: string;
  name: string;
  id: string;
  text: string;
  logo: string;
  added: string;
  links: string;
  application: Application;
  purpose: string;
  email_user_support: string;
  quotas: string;
  location: string;
  country: Country;
}
