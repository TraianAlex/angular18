import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  form,
  FormRoot,
  FormField,
  required,
  apply,
  schema,
  min,
  applyEach,
} from '@angular/forms/signals';
import { OrderInfo, UserService } from './user.service';

interface LineItem {
  product: string;
  quantity: number;
}
const lineItemSchema = schema<LineItem>((item) => {
  required(item.product, { message: 'Product name is required' });
  min(item.quantity, 1, { message: 'Quantity must be at least 1' });
});

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormRoot, FormField],
})
export class OrderFormComponent {
  userService = inject(UserService);

  constructor() {
    console.log(this.orderForm.items[0].product);
    console.log(this.orderForm.items[0].quantity);
  }

  INITIAL_ORDER_INFO: OrderInfo = {
    customerName: '',
    items: [
      {
        product: '',
        quantity: 1,
      },
    ],
  };
  orderInfo = signal<OrderInfo>({ ...this.INITIAL_ORDER_INFO });
  orderForm = form(
    this.orderInfo,
    (path) => {
      required(path.customerName);
      // applyEach(path.items, (item) => {
      //   required(item.product, { message: 'Product name is required' });
      //   min(item.quantity, 1, { message: 'Quantity must be at least 1' });
      // });
      applyEach(path.items, lineItemSchema);
    },
    {
      submission: {
        action: async (form) => {
          try {
            await this.userService.saveOrderInfo(form().value());
            form().reset({ ...this.INITIAL_ORDER_INFO });
            return;
          } catch {
            return { kind: 'serverError', message: 'Failed to save order info' };
          }
        },
        onInvalid: () => {
          console.log('Invalid order');
        },
      },
    },
  );

  addItem() {
    this.orderForm.items().value.update((items) => [...items, { product: '', quantity: 1 }]);
  }

  removeItem(index: number) {
    this.orderForm.items().value.update((items) => items.filter((_, i) => i !== index));
  }
}
