import { required, pattern, validateHttp, SchemaPath, validateAsync } from '@angular/forms/signals';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ZipCodeService } from '../zip-code.service';

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

// validation strategy is asynchronous but not based on HTTP requests
export function registerZipValidation2(
  zipPath: SchemaPath<string, any, any>,
  countryPath: SchemaPath<string, any, any>,
): void {
  const zipCodeService = inject(ZipCodeService);

  required(zipPath, { message: 'Zip code is required' });

  pattern(zipPath, /^\d{5}$/, {
    message: 'Zip code must be 5 digits',
    when: ({ valueOf }) => valueOf(countryPath) === 'US',
  });

  pattern(zipPath, /([ABCEGHJKLMNPRSTVXY]\d)([ABCEGHJKLMNPRSTVWXYZ]\d){2}/, {
    message: 'Zip code must follow the A1A 1A1 format',
    when: ({ valueOf }) => valueOf(countryPath) === 'CA',
  });

  validateAsync(zipPath, {
    // Skip async validation as long as we don't have 5 characters
    params: ({ value }) => (value().length >= 5 ? value() : undefined),
    // createZipCodeResource uses a service to get an httpResource
    factory: (zip) => zipCodeService.createZipCodeResource(zip),
    onSuccess: (result) => {
      if (result.ok) {
        return null;
      }
      return {
        kind: 'invalidZipCode',
        message: 'Zip code is invalid',
      };
    },
    onError: (error) => {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        return {
          kind: 'invalidZipCode',
          message: 'Zip code is invalid',
        };
      }
      console.error('Validation failed:', error);
      return {
        kind: 'serverError',
        message: 'Could not verify zip code',
      };
    },
  });
}
