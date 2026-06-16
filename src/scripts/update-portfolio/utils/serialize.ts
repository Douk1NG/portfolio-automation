type SerializableValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | SerializableValue[]
  | { [key: string]: SerializableValue }
  | object; // We allow generic object here to allow TS to not complain about unknown

/**
 * Serializes a JavaScript object into a TypeScript-compatible string.
 * This is safer and cleaner than manual string interpolation.
 */
export function serializeToTs<T extends SerializableValue>(value: T, indent: number = 0): string {
  const spaces = ' '.repeat(indent);

  if (value === null) return 'null';
  if (value === undefined) return 'undefined';

  if (typeof value === 'string') {
    // Escape single quotes and use single quotes for the output
    return `'${value.replace(/'/g, "\\'")}'`;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value
      .map((item) => `${spaces}  ${serializeToTs(item as SerializableValue, indent + 2)}`)
      .join(',\n');
    return `[\n${items},\n${spaces}]`;
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value);
    if (entries.length === 0) return '{}';

    const properties = entries
      .map(([key, val]) => {
        // Only quote keys if they are not valid identifiers
        const formattedKey = /^[a-z$_][a-z0-9$_]*$/i.test(key) ? key : `'${key}'`;
        return `${spaces}  ${formattedKey}: ${serializeToTs(val as SerializableValue, indent + 2)}`;
      })
      .join(',\n');
    return `{\n${properties},\n${spaces}}`;
  }

  return String(value);
}

/**
 * Generates the full content of a TypeScript file with imports and exports.
 */
export function generateTsFile(config: {
  imports: string[];
  exports: Array<{
    name: string;
    type?: string;
    value: SerializableValue;
  }>;
}): string {
  const importLines = config.imports.join('\n');
  const exportLines = config.exports
    .map((exp) => {
      const typeStr = exp.type ? `: ${exp.type}` : '';
      return `export const ${exp.name}${typeStr} = ${serializeToTs(exp.value)}`;
    })
    .join('\n\n');

  return `${importLines}\n\n${exportLines}\n`;
}
