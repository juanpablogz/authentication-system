import validator from 'validator';

export enum TileOption {
  image = 'image',
  tiles = 'tiles',
  video = 'video',
}

export interface SceneFormFields {
  readonly id: string;
  name: string;
  url: string;
  type: TileOption;
}

/* Message error of each field */
export interface ValidationError {
  name?: string;
  url?: string;
}

export function validateBasicFields(field: SceneFormFields): ValidationError {
  const errors: ValidationError = {};

  /* Scene name */
  if (validator.isEmpty(field.name)) errors.name = 'Please provide a scene name';

  /* Scene url */
  // if (!validator.isURL(field.url)) errors.url = 'Please write a valid url';
  if (validator.isEmpty(field.url)) errors.url = 'Please write an url';

  return errors;
}
