import validator from 'validator';

export interface BasicFields {
  name: string;
  client: string;
  favicon: any;
  template: string;
}

/* Every field */
export type CreateProjectFormFields = Partial<BasicFields>;

/* Message error of each field */
export interface ValidationError {
  name?: string;
  client?: string;
  favicon?: any;
}

export function validateBasicFields(field: BasicFields): ValidationError {
  const errors: ValidationError = {};

  if (validator.isEmpty(field.name)) errors.name = 'Please write a name';
  if (validator.isEmpty(field.client)) errors.client = 'Please write a client name';
  // if (validator.isEmpty(field.favicon)) errors.favicon = 'Please write a favicon url';
  // if (!validator.isURL(field.thumbnail)) errors.thumbnail = 'Please write a valid url';

  return errors;
}
