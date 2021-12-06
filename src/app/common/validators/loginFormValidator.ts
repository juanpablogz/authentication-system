import validator from 'validator';

export interface BasicFields {
  email: string;
  password: string;
}

/* Every field of Login Forms */
export type LoginFormFields = Partial<BasicFields>;

/* Message error of each field */
export interface ValidationError {
  email?: string;
  password?: string;
}

export function validateBasicFields(field: BasicFields): ValidationError {
  const errors: ValidationError = {};

  /* User email */
  if (!validator.isEmail(field.email)) errors.email = 'Wrong email';
  if (validator.isEmpty(field.email)) errors.email = 'Empty email';

  /* Password password */
  if (validator.isEmpty(field.password)) errors.password = 'Empty password';

  return errors;
}
