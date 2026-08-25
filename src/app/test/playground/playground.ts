import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormRoot, FormField, submit } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { UserService } from './user.service';

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
      city: '',
      zip: '',
    },
    cc: '',
  });
  userForm = form(this.userInfo, {
    submission: {
      action: async (field) => {
        try {
          await this.userService.saveUserInfo(field().value());
          return;
        } catch {
          return { kind: 'serverError', message: 'Failed to save user info' };
        }
      },
    },
  });

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
