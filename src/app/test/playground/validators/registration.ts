import { signal } from '@angular/core';
import { form, validate } from '@angular/forms/signals';

const model = signal<{ username: string; password: string; confirmPassword: string }>({
  username: '',
  password: '',
  confirmPassword: '',
});

const registrationForm = form(model, (f) => {
  // Custom validator - function receives context with value
  validate(f.username, ({ value }) => {
    const username = value();
    if (username.includes(' ')) {
      return { kind: 'no-spaces', message: 'Name cannot contain spaces' };
    }
    return undefined; // no error
  });

  // Validator with access to other fields
  validate(f.confirmPassword, ({ value, valueOf }) => {
    if (value() !== valueOf(f.password)) {
      return { kind: 'password-mismatch', message: 'Passwords are not identical' };
    }
    return undefined;
  });
});
