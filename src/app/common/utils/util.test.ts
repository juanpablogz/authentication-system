import {
  arraytoString,
  formatBytes,
  hasProp,
  isArray,
  isEmpty,
  isNullOrUndefined,
  stringToSlug,
  stringToArray,
  toMb,
} from './utils';

describe('arraytoString()', () => {
  test('should return the converted Array into a String', () => {
    const input = ['Button', 'Input', 'Textarea', 'Tag'];
    const output = 'Button,Input,Textarea,Tag';
    expect(arraytoString(input, ',')).toEqual(output);
  });

  test('should return the converted Array into an String (separator is undefined)', () => {
    const input = ['Button', 'Input', 'Textarea', 'Tag'];
    const output = 'Button, Input, Textarea, Tag';
    expect(arraytoString(input)).toEqual(output);
  });

  test('should return empty String if the input is Empty', () => {
    const input = [];
    expect(arraytoString(input)).toEqual('');
  });

  test('should return empty String if the input is undefined', () => {
    let input;
    expect(arraytoString(input)).toEqual('');
  });
});

describe('hasProp()', () => {
  test('should return true if the Object has the provided prop', () => {
    const input = { name: 'Button' };
    expect(hasProp(input, 'name')).toBe(true);
  });

  test('should return false if the Object does not have the provided prop', () => {
    const input = { url: 'https://www.uiguideline.com' };
    expect(hasProp(input, 'name')).toBe(false);
  });

  test('should return false if the value is not an Object', () => {
    const input = 'Button';
    expect(hasProp(input, 'name')).toBe(false);
  });
});

describe('isArray()', () => {
  test('should return true if the variable is an Array', () => {
    const input = [{ name: 'Button' }, { name: 'Input' }];
    expect(isArray(input)).toBe(true);
  });

  test('should return true if the variable is an empty Array', () => {
    const input = [];
    expect(isArray(input)).toBe(true);
  });

  test('should return false if the variable is not an Array', () => {
    const input = { name: 'Button' };
    expect(isArray(input)).toBe(false);
  });
});

describe('isEmpty()', () => {
  test('should return true if an object is empty', () => {
    const input = {};
    expect(isEmpty(input)).toBe(true);
  });

  test('should return false if an object is not empty', () => {
    const input = { name: 'Button' };
    expect(isEmpty(input)).toBe(false);
  });

  test('should return true if an string is empty', () => {
    const input = '';
    expect(isEmpty(input)).toBe(true);
  });

  test('should return false if an string is not empty', () => {
    const input = 'Sergio';
    expect(isEmpty(input)).toBe(false);
  });

  test('should return true if an array is empty', () => {
    const input = [];
    expect(isEmpty(input)).toBe(true);
  });

  test('should return false if an array is not empty', () => {
    const input = [{ name: 'Button' }, { name: 'Input' }];
    expect(isEmpty(input)).toBe(false);
  });
});

describe('isNullOrUndefined()', () => {
  test('should return true if the variable is null', () => {
    const input = null;
    expect(isNullOrUndefined(input)).toBe(true);
  });

  test('should return true if the variable is undefined', () => {
    let input;
    expect(isNullOrUndefined(input)).toBe(true);
  });

  test('should return false if the variable is not null or undefined', () => {
    const input = 'Button';
    expect(isNullOrUndefined(input)).toBe(false);
  });
});

describe('stringToArray()', () => {
  test('should return the converted String into an Array', () => {
    const input = 'Button,Input,Textarea,Tag';
    const output = ['Button', 'Input', 'Textarea', 'Tag'];
    expect(stringToArray(input, ',')).toEqual(output);
  });

  test('should return the same String if it does not include the separator', () => {
    const input = 'Button,Input,Textarea,Tag';
    const output = 'Button,Input,Textarea,Tag';
    expect(stringToArray(input, '|')).toEqual(output);
  });

  test('should return the converted String into an Array (separator is undefined)', () => {
    const input = 'Button, Input, Textarea, Tag';
    const output = ['Button', 'Input', 'Textarea', 'Tag'];
    expect(stringToArray(input)).toEqual(output);
  });
});

describe('stringToSlug()', () => {
  test('should return the converted string into a slug', () => {
    const input = 'Combo Box / Menu';
    const output = 'combo-box-menu';
    expect(stringToSlug(input)).toEqual(output);
  });

  test('should return the empty string if the variable is undefined', () => {
    let input;
    expect(stringToSlug(input)).toEqual('');
  });
});

describe('toMb()', () => {
  test('should return the converted bytes into megabytes', () => {
    const input = 9000000;
    const output = 8.58306884765625;
    expect(toMb(input)).toEqual(output);
  });
});

describe('formatBytes()', () => {
  test('should return the converted bytes into KB format (decimals)', () => {
    const input = 10000;
    const output = '10 KB';
    expect(formatBytes(input, 0)).toEqual(output);
  });

  test('should return the converted bytes into KB format (decimals undefined)', () => {
    const input = 10000;
    const output = '10 KB';
    expect(formatBytes(input)).toEqual(output);
  });

  test('should return the converted bytes into KB format (binary)', () => {
    const input = 10000;
    const output = '9.77 KB';
    expect(formatBytes(input, 2)).toEqual(output);
  });

  test('should return 0 Bytes if the input is undefined', () => {
    let input;
    const output = '0 Bytes';
    expect(formatBytes(input, 2)).toEqual(output);
  });

  // ------------------------------

  test('should return the converted bytes into KB format', () => {
    const input = 1000000;
    const output = '977 KB';
    expect(formatBytes(input)).toEqual(output);
  });

  test('should return the converted bytes into MB format', () => {
    const input = 1000000000;
    const output = '954 MB';
    expect(formatBytes(input)).toEqual(output);
  });

  test('should return the converted bytes into GB format', () => {
    const input = 1000000000000;
    const output = '931 GB';
    expect(formatBytes(input, 0)).toEqual(output);
  });

  test('should return the converted bytes into TB format', () => {
    const input = 10000000000000;
    const output = '9 TB';
    expect(formatBytes(input, 0)).toEqual(output);
  });
});
