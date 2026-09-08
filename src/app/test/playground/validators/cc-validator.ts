import { SchemaPath, validate } from '@angular/forms/signals';

export function mustBeFromValidProvider(field: SchemaPath<string>) {
  validate(field, ({ value }) => {
    if (!(value().startsWith('37') || value().startsWith('4') || value().startsWith('5'))) {
      return {
        kind: 'cc-provider',
        message: 'Your credit card is not from a supported provider',
      };
    }
    return null;
  });
}
