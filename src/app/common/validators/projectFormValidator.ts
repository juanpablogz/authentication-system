// import validator from 'validator';

export interface ProjectFormFields {
  shareTitle: string;
  shareDesc: string;
  audio: string;
  exitLink: string;
  exitAsk: string;
  exitYesText: string;
  exitYesBgColor: string;
  exitNo: string;
  iconsTouchpoint: string;
  iconsClose: string;
  iconsMap: string;
  iconsAudioOn: string;
  iconsAudioOff: string;
  iconsShare: string;
  iconsShareIos: string;
}

/* Message error of each field */
export interface ValidationError {} // eslint-disable-line @typescript-eslint/no-empty-interface

export function validateBasicFields(): ValidationError {
  const errors: ValidationError = {};

  return errors;
}
