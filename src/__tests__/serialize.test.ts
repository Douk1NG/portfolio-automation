import { describe, it, expect } from 'vitest';
import { serializeToTs, generateTsFile } from '@/scripts/update-portfolio/utils/serialize';

describe('serializeToTs', () => {
  it('serializes primitives correctly', () => {
    expect(serializeToTs('hello')).toBe("'hello'");
    expect(serializeToTs(123)).toBe('123');
    expect(serializeToTs(true)).toBe('true');
    expect(serializeToTs(false)).toBe('false');
    expect(serializeToTs(null)).toBe('null');
    expect(serializeToTs(undefined)).toBe('undefined');
  });

  it('escapes single quotes in strings', () => {
    expect(serializeToTs("It's a test")).toBe("'It\\'s a test'");
  });

  it('serializes arrays correctly', () => {
    expect(serializeToTs([])).toBe('[]');
    expect(serializeToTs([1, 'two'])).toBe("[\n  1,\n  'two',\n]");
  });

  it('serializes objects correctly', () => {
    expect(serializeToTs({})).toBe('{}');
    expect(serializeToTs({ a: 1, b: 'two' })).toBe("{\n  a: 1,\n  b: 'two',\n}");
  });

  it('quotes object keys that are not valid identifiers', () => {
    expect(serializeToTs({ 'my-key': 1, '123key': 2, 'hello world': 3 })).toBe(
      "{\n  'my-key': 1,\n  '123key': 2,\n  'hello world': 3,\n}",
    );
  });

  it('serializes nested structures', () => {
    const data = {
      nested: [{ id: 1, name: 'one' }],
    };
    const expected = `{\n  nested: [\n    {\n      id: 1,\n      name: 'one',\n    },\n  ],\n}`;
    expect(serializeToTs(data)).toBe(expected);
  });
});

describe('generateTsFile', () => {
  it('generates a complete TypeScript file string', () => {
    const result = generateTsFile({
      imports: ["import { Test } from 'test';"],
      exports: [
        {
          name: 'myData',
          type: 'Test',
          value: { key: 'value' },
        },
      ],
    });

    expect(result).toContain("import { Test } from 'test';");
    expect(result).toContain('export const myData: Test = {');
    expect(result).toContain("key: 'value'");
  });

  it('generates exports without types', () => {
    const result = generateTsFile({
      imports: [],
      exports: [
        {
          name: 'simple',
          value: 123,
        },
      ],
    });

    expect(result).toContain('export const simple = 123');
  });
});
