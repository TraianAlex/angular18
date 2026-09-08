import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  form,
  FormRoot,
  FormField,
  submit,
  required,
  maxLength,
  minLength,
  pattern,
  apply,
  schema,
  applyWhen,
  applyWhenValue,
} from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { UserService } from './user.service';
import { mustBeFromValidProvider } from './validators/cc-validator';
import { validateCreditCardNumber } from './validators/credit-card-validator';
import { Address, addressSchema } from './validators/address-schema-validation';

interface UsAddress {
  country: 'US';
  street: string;
  city: string;
  zip: string;
}
interface CaAddress {
  country: 'CA';
  street: string;
  city: string;
  zip: string;
}
type Address2 = UsAddress | CaAddress;
@Component({
  selector: 'app-playground',
  templateUrl: './playground.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormRoot, FormField, JsonPipe],
})
export class PlaygroundComponent {
  userService = inject(UserService);

  model = signal<{ email: string; password: string }>({ email: '', password: '' });
  loginForm = form(this.model);

  constructor() {
    // this.model.set({ email: 'test@test.com', password: 'password' });
    // this.loginForm().value.set({ email: 'test2@test.com', password: 'password2' });
    // this.loginForm.email().value.set('test3@test.com');
    // this.loginForm.password().value.set('password3');
    console.log(this.orderForm.items[0].product);
    console.log(this.orderForm.items[0].quantity);
    this.userForm.address.city().value.set('John');
    console.log(this.userForm.address.street().invalid(), this.userForm.address().valid());
  }
  // ------------------------------------------------------------
  orderInfo = signal({
    customerName: '',
    items: [
      {
        product: '',
        quantity: 1,
      },
    ],
  });
  orderForm = form(this.orderInfo);

  addItem() {
    this.orderForm.items().value.update((items) => [...items, { product: '', quantity: 1 }]);
  }

  removeItem(index: number) {
    this.orderForm.items().value.update((items) => items.filter((_, i) => i !== index));
  }
  // ------------------------------------------------------------
  userInfo = signal({
    firstName: '',
    lastName: '',
    address: {
      street: '',
      country: '',
      city: '',
      zip: '',
    },
    cc: '',
  });

  usZipSchema = schema<Address>((address) => {
    pattern(address.zip, /^\d{5}$/, { message: 'Zip code must be 5 digits' });
  });
  caZipSchema = schema<Address>((address) => {
    pattern(
      address.zip,
      /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d$/,
      {
        message: 'Zip code must follow the A1A 1A1 format',
      },
    );
  });

  userForm = form(
    this.userInfo,
    (path) => {
      required(path.firstName, { message: 'First name is required' });
      required(path.lastName, { message: 'Last name is required' });
      // required(path.cc, { message: 'Credit card number is required' });
      // minLength(path.cc, 16, { message: 'Credit card number must have 16 digits' });
      // maxLength(path.cc, 16, { message: 'Credit card number must be less than 17 digits' });
      // mustBeFromValidProvider(path.cc);
      validateCreditCardNumber(path.cc);
      // required(path.address.street, { message: 'Address is required' });
      // required(path.address.country, { message: 'Country is required' });
      // required(path.address.city, { message: 'City is required' });
      // required(path.address.zip, { message: 'Zip is required' });
      apply(path.address, addressSchema);
      // pattern(path.address.zip, /^\d{5}$/, { message: 'Zip must be 5 digits' });
      // pattern(path.address.zip, /^\d{5}$/, {
      //   message: 'Zip code must be 5 digits',
      //   when: ({ valueOf }) => valueOf(path.address.country) === 'US',
      // });
      // pattern(path.address.zip, / ([ABCEGHJKLMNPRSTVXY] \d)([ABCEGHJKLMNPRSTVWXYZ] \d) {2}/, {
      //   message: 'Zip code must follow the A1A 1A1 format',
      //   when: ({ valueOf }) => valueOf(path.address.country) === 'CA',
      // });
      // applyWhen(
      //   path.address,
      //   ({ valueOf }) => valueOf(path.address.country) === 'US',
      //   this.usZipSchema,
      // );
      // applyWhen(
      //   path.address,
      //   ({ valueOf }) => valueOf(path.address.country) === 'CA',
      //   this.caZipSchema,
      // );
      applyWhenValue(
        path.address,
        (address): address is UsAddress => address.country === 'US',
        (address) => pattern(address.zip, /^\d{5}$/, { message: 'Zip code must be 5 digits' }),
      );
      applyWhenValue(
        path.address,
        (address): address is CaAddress => address.country === 'CA',
        (address) =>
          pattern(address.zip, /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d$/, {
            message: 'Postal code must follow the A1A 1A1 format',
          }),
      );
    },
    {
      submission: {
        action: async (field) => {
          try {
            await this.userService.saveUserInfo(field().value());
            return;
          } catch {
            return { kind: 'serverError', message: 'Failed to save user info' };
          }
        },
        onInvalid: () => {
          console.log('Invalid');
        },
      },
    },
  );

  async onSave() {
    const success = await submit(this.userForm, async (field) => {
      try {
        await this.userService.saveUserInfo(field().value());
        return;
      } catch {
        return { kind: 'serverError', message: 'Failed to save user info' };
      }
    });
    if (success) {
      console.error('Successfully saved user info');
    }
  }
}
