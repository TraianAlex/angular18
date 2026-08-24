import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormRoot, FormField } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormRoot, FormField, JsonPipe],
})
export class PlaygroundComponent {
  model = signal<{ email: string; password: string }>({ email: '', password: '' });
  loginForm = form(this.model);

  constructor() {
    this.model.set({ email: 'test@test.com', password: 'password' });
    this.loginForm().value.set({ email: 'test2@test.com', password: 'password2' });
    this.loginForm.email().value.set('test3@test.com');
    this.loginForm.password().value.set('password3');
    console.log(this.orderForm.items[0].product);
    console.log(this.orderForm.items[0].quantity);
  }

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
}
