import React from 'react';
import { isJsonSchema, hasNotSchema } from '../../src/helpers/util';

describe('util', () => {
  test('hasNotSchema', () => {
    expect(hasNotSchema({ component: 'input', _notSchema: true })).toBeTruthy();

    expect(hasNotSchema({ component: 'input' })).toBeFalsy();
  });

  test('isJsonSchema', () => {
    expect(isJsonSchema({ component: 'input', allowClear: true })).toBeTruthy();

    expect(isJsonSchema({})).toBeFalsy();
    expect(isJsonSchema(123)).toBeFalsy();
    expect(isJsonSchema({ allowClear: true })).toBeFalsy();
    expect(isJsonSchema({ component: 'input', _notSchema: true })).toBeFalsy();
  });
});
