import { Component, signal } from '@angular/core';
import { disabled, form, FormField, FormRoot, hidden, readonly } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { DemoFieldErrors } from './field-errors';

/**
 * Reactive `disabled`, `hidden`, and `readonly` rules.
 * `hidden()` only marks form state — the template must actually hide the control.
 */
@Component({
  selector: 'app-conditions-demo',
  imports: [FormField, FormRoot, JsonPipe, DemoFieldErrors],
  template: `
    <form [formRoot]="orderForm" class="mt-3 space-y-3">
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="cond-order-type"
          >Order type</label
        >
        <select
          id="cond-order-type"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="orderForm.orderType"
        >
          <option value="retail">Retail</option>
          <option value="wholesale">Wholesale</option>
        </select>
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="cond-discount"
          >Discount code</label
        >
        <input
          id="cond-discount"
          type="text"
          class="w-full rounded-md border border-gray-300 p-2 disabled:bg-slate-100"
          [formField]="orderForm.discountCode"
        />
        @if (orderForm.discountCode().disabled()) {
          <p class="mt-1 text-sm text-amber-700">
            {{
              orderForm.discountCode().disabledReasons()[0]?.message ?? 'Discount code is disabled'
            }}
          </p>
        }
        <app-demo-field-errors [field]="orderForm.discountCode()" />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="cond-customer"
          >Customer type</label
        >
        <select
          id="cond-customer"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="orderForm.customerType"
        >
          <option value="individual">Individual</option>
          <option value="business">Business</option>
        </select>
      </div>
      @if (!orderForm.companyName().hidden()) {
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700" for="cond-company"
            >Company name</label
          >
          <input
            id="cond-company"
            type="text"
            class="w-full rounded-md border border-gray-300 p-2"
            [formField]="orderForm.companyName"
          />
          <app-demo-field-errors [field]="orderForm.companyName()" />
        </div>
      }
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="cond-total"
          >Total price (readonly)</label
        >
        <input
          id="cond-total"
          type="number"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="orderForm.totalPrice"
        />
      </div>
    </form>
    <pre class="mt-3 overflow-auto rounded bg-slate-50 p-2 text-xs text-slate-700">{{
      orderForm().value() | json
    }}</pre>
  `,
})
export class ConditionsDemo {
  private readonly model = signal({
    orderType: 'retail',
    discountCode: '',
    customerType: 'individual',
    companyName: '',
    totalPrice: 99,
  });

  readonly orderForm = form(this.model, (order) => {
    disabled(order.discountCode, {
      when: ({ valueOf }) =>
        valueOf(order.orderType) === 'wholesale'
          ? 'Discount codes do not apply to wholesale orders'
          : false,
    });
    hidden(order.companyName, {
      when: ({ valueOf }) => valueOf(order.customerType) !== 'business',
    });
    readonly(order.totalPrice);
  });
}
