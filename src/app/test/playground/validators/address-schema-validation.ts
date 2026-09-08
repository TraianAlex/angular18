import { schema, required } from '@angular/forms/signals';

export interface Address {
  street: string;
  zip: string;
  city: string;
  country: string;
}

export const addressSchema = schema<Address>((address) => {
  required(address.street, { message: 'Street is required' });
  required(address.country, { message: 'Country is required' });
  required(address.city, { message: 'City is required' });
  required(address.zip, { message: 'Zip code is required' });
});
