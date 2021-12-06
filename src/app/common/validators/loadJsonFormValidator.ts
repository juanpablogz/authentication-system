import validator from 'validator';

export interface BasicFields {
  url: string;
  name: string;
  client: string;
  thumbnail: string;
}

/* Every field */
export type LoadJsonFormFields = Partial<BasicFields>;

/* Message error of each field */
export interface ValidationError {
  url?: string;
  name?: string;
  client?: string;
  thumbnail?: string;
}

export function validateBasicFields(field: BasicFields): ValidationError {
  const errors: ValidationError = {};

  /* JSON url */
  // if (!validator.isURL(field.url)) errors.url = 'Please provide a valid URL where you host the config JSON file';
  if (validator.isEmpty(field.url)) errors.url = 'Please enter a valid url';
  if (validator.isEmpty(field.name)) errors.name = 'Please enter a project name';
  if (validator.isEmpty(field.client)) errors.client = 'Please enter the client name';
  // if (validator.isEmpty(field.thumbnail)) errors.thumbnail = 'Please enter a thumbnail url';
  // if (!validator.isURL(field.thumbnail)) errors.thumbnail = 'Please enter a valid url';
  return errors;
}
