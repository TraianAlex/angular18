import { SchemaPath, validateHttp } from '@angular/forms/signals';
import { environment } from '../../../../environments/environment';

interface LoginRecord {
  id: number;
  email: string;
  password: string;
}

/**
 * Registers async HTTP validation that checks whether an email is already in the login collection.
 */
export function registerUniqueEmailValidation(emailPath: SchemaPath<string>): void {
  validateHttp(emailPath, {
    request: ({ value }) => {
      const email = value()?.trim();
      if (!email) {
        return undefined;
      }
      return `${environment.apiUrl}/login?email=${encodeURIComponent(email)}`;
    },
    onSuccess: (matches: LoginRecord[]) => {
      if (matches.length > 0) {
        return { kind: 'emailTaken', message: 'Email is already registered' };
      }
      return undefined;
    },
    onError: () => ({
      kind: 'emailValidationFailed',
      message: 'Could not validate email uniqueness.',
    }),
    debounce: 300,
  });
}
