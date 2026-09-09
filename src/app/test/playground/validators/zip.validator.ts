import { required, pattern, validateHttp, SchemaPath } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Registers zip code validation rules on the specified zip and country paths.
 */
export function registerZipValidation(
  zipPath: SchemaPath<string, any, any>,
  countryPath: SchemaPath<string, any, any>,
): void {
  required(zipPath, { message: 'Zip code is required' });

  pattern(zipPath, /^\d{5}$/, {
    message: 'Zip code must be 5 digits',
    when: ({ valueOf }) => valueOf(countryPath) === 'US',
  });

  pattern(zipPath, /([ABCEGHJKLMNPRSTVXY]\d)([ABCEGHJKLMNPRSTVWXYZ]\d){2}/, {
    message: 'Zip code must follow the A1A 1A1 format',
    when: ({ valueOf }) => valueOf(countryPath) === 'CA',
  });

  validateHttp(zipPath, {
    request: (ctx) => {
      const country = ctx.valueOf(countryPath)?.toLowerCase();
      let zip = ctx.value()?.trim().replace(/\s+/g, '');
      if (!country || !zip) {
        return undefined;
      }
      if (country === 'ca') {
        zip = zip.substring(0, 3);
      }
      return `https://api.zippopotam.us/${country}/${zip}`;
    },
    onSuccess: () => undefined,
    onError: (err) => {
      if (err instanceof HttpErrorResponse && err.status === 404) {
        return { kind: 'invalidZip', message: 'Zip code is not valid' };
      }
      return { kind: 'zipValidationFailed', message: 'Could not validate zip code.' };
    },
    debounce: 300,
    when: (ctx) => {
      const country = ctx.valueOf(countryPath);
      return country === 'US' || country === 'CA';
    },
  });
}
