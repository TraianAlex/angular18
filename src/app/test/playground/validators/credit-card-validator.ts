import { maxLength, minLength, required, SchemaPath, validate } from '@angular/forms/signals';
import { mustBeFromValidProvider } from './cc-validator';

export function validateCreditCardNumber(field: SchemaPath<string>) {
  required(field, { message: 'A credit card number is required' });
  mustBeFromValidProvider(field);
  minLength(field, 16, { message: ' A credit card number must be 16 digits long' });
  maxLength(field, 16, { message: 'Credit card number must be less than 17 digits' });
}
