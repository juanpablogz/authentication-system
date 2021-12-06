import slug from 'slug';

/**
 * arraytoString
 * @description - parse a Array into a String based on a separator
 * @function
 * @param {Array<string>} elements - Array to parse
 * @param {string} separator - string to use as a separator
 * @return {string} parsed Array
 * (e.g. input -> ['Button', 'Button Group'], output -> 'Button, Button Group').
 */
export const arraytoString = (elements: Array<string> = [], separator = ', '): string => {
  if (elements.length === 0) return '';
  return elements.join(separator);
};

/**
 * formatDate
 * @description - parse a Timestamp value into a String
 * @function
 * @param {number} timestamp
 * @return {string} parsed Date
 * (e.g. input -> 1611917520, output -> 'Jan 29 2021').
 */
export const formatDate = (timestamp: number): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(timestamp * 1000);
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

/**
 * formatBytes
 * @description - parse bytes to KB, MB, GB, etc
 * @function
 * @param {number} bytes - bytes to parse
 * @param {number} decimals - decimals (0) or binary (2) form
 * @return {string} Returns the bytes parsed.
 */
export const formatBytes = (bytes = 0, decimals = 0): string => {
  if (bytes === 0) return '0 Bytes';
  const kb = 1024;
  const parsedDecimal = decimals <= 0 ? 0 : decimals || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const index = Math.floor(Math.log(bytes) / Math.log(kb));
  return parseFloat((bytes / Math.pow(kb, index)).toFixed(parsedDecimal)) + ' ' + sizes[index];
};

/**
 * hasProp
 * @description - validate if an object has the prop passed arg
 * @function
 * @param {any} obj - Object to validate
 * @param {string} prop - prop's key to check if it belongs to the obj
 * @return {boolean} The obj does has the prop.
 */
export const hasProp = (obj = {}, prop: string): boolean => {
  if (obj === null || typeof obj !== 'object') return false;
  return prop in obj;
};

/**
 * isArray
 * @description - validate if an element is an Array
 * @function
 * @param {any} element - Element to validate
 * @return {boolean} Element is an Array or not.
 */
export const isArray = (element): boolean => Array.isArray(element);

/**
 * isEmpty
 * @description - validate if an variable (string, string, array) is Empty
 * @function
 * @param {Object} value - Value to validate
 * @return {boolean} Value is empty or not.
 */
export const isEmpty = (value): boolean => value && Object.keys(value).length === 0;

/**
 * isNullOrUndefined
 * @description - validate if an element is null or undefined
 * @function
 * @param {any} value - Element to validate
 * @return {boolean} Element is null or undefined.
 */
export const isNullOrUndefined = (value): boolean => value === undefined || value === null;

/**
 * stringToArray
 * @description - parse a String into an Array based on a separator
 * @function
 * @param {string} elements - string to parse
 * @param {string} separator - string to use as a separator
 * @return {Array<string> | string} parsed string
 * (e.g. input -> 'Button, Button Group', output -> ['Button', 'Button Group']).
 */
export const stringToArray = (elements: string, separator = ', '): Array<string> | string => {
  if (elements.includes(separator)) return elements.split(separator) || [];
  return elements;
};

/**
 * stringToSlug
 * @description - parse a String into a Slug format
 * @function
 * @param {string} str - string to parse
 * @return {string} parsed string
 * (e.g. input -> Menu Dropdown, output -> menu-dropdown).
 */
export const stringToSlug = (str = ''): string => {
  return slug(str, { lower: true });
};

/**
 * toMb
 * @description - parse a number into the megabyte format
 * @function
 * @param {number} bytes - bytes to parse
 * @return {number} Returns the megabyte representation.
 */
export const toMb = (bytes: number): number => {
  return bytes / 1024 / 1024;
};

/**
 * floatToString
 * @description - parse a float to string (reducing decimals to 3)
 * @function
 * @param {number} num - number to parse
 * @return {string} Returns the num parsed.
 */
export const floatToString = (num: number): string => {
  return num.toFixed(3).toString();
};

/**
 * exportJsonFile
 * @description - Create a temporal anchor to download the Json file on the browser
 * @function
 * @param {string} content - content to convert JSON
 * @param {string} fileName - json file name
 * @param {string} contentType - content file type
 * @return {void}
 */
export const exportJsonFile = (content: string, fileName: string, contentType = 'application/json'): void => {
  // const json = JSON.stringify(content, null, '\t');

  /* Temp anchor to download file */
  const a = document.createElement('a');
  const jsonBlob = new Blob([content], { type: contentType });

  a.href = URL.createObjectURL(jsonBlob);
  a.download = fileName;

  a.click();
  URL.revokeObjectURL(a.href);
  a.remove();
};
