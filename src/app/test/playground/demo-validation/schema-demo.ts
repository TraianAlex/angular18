import { Component, signal } from '@angular/core';
import {
  apply,
  applyEach,
  applyWhen,
  applyWhenValue,
  email,
  form,
  FormField,
  FormRoot,
  minLength,
  pattern,
  required,
  schema,
} from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { DemoFieldErrors } from './field-errors';

interface Address {
  street: string;
  city: string;
  zipCode: string;
}

interface Contact {
  email: string;
  phone: string;
}

interface CardPayment {
  cardNumber: string;
}

interface CustomerDocument {
  type: 'invoice' | 'receipt';
  invoiceNumber: string;
  receiptNumber: string;
}

const addressSchema = schema<Address>((addr) => {
  required(addr.street, { message: 'Street is required' });
  required(addr.city, { message: 'City is required' });
  required(addr.zipCode, { message: 'Zip is required' });
  pattern(addr.zipCode, /^\d{2}-\d{3}$/, { message: 'Use 12-345 format' });
});

const contactSchema = schema<Contact>((contact) => {
  required(contact.email, { message: 'Email is required' });
  email(contact.email, { message: 'Enter a valid email' });
  minLength(contact.phone, 9, { message: 'Phone must be at least 9 characters' });
});

const cardPaymentSchema = schema<CardPayment>((payment) => {
  required(payment.cardNumber, { message: 'Card number is required' });
  minLength(payment.cardNumber, 16, { message: 'Card number must be 16 digits' });
});

const invoiceSchema = schema<CustomerDocument>((doc) => {
  required(doc.invoiceNumber, { message: 'Invoice number is required' });
});

/**
 * Reusable `schema`, `apply`, `applyEach`, `applyWhen`, and `applyWhenValue`.
 */
@Component({
  selector: 'app-schema-demo',
  imports: [FormField, FormRoot, JsonPipe, DemoFieldErrors],
  template: `
    <form [formRoot]="customerForm" class="mt-3 space-y-4">
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="schema-name">Name</label>
        <input
          id="schema-name"
          type="text"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="customerForm.name"
        />
        <app-demo-field-errors [field]="customerForm.name()" />
      </div>

      <fieldset class="rounded-md border border-slate-200 p-3">
        <legend class="px-1 text-sm font-semibold text-gray-700">Billing address</legend>
        <label class="mb-1 mt-2 block text-sm text-gray-700" for="schema-bill-street">Street</label>
        <input
          id="schema-bill-street"
          type="text"
          class="mb-2 w-full rounded-md border border-gray-300 p-2"
          [formField]="customerForm.billingAddress.street"
        />
        <label class="mb-1 block text-sm text-gray-700" for="schema-bill-city">City</label>
        <input
          id="schema-bill-city"
          type="text"
          class="mb-2 w-full rounded-md border border-gray-300 p-2"
          [formField]="customerForm.billingAddress.city"
        />
        <label class="mb-1 block text-sm text-gray-700" for="schema-bill-zip">Zip (12-345)</label>
        <input
          id="schema-bill-zip"
          type="text"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="customerForm.billingAddress.zipCode"
        />
        <app-demo-field-errors [field]="customerForm.billingAddress()" />
      </fieldset>

      <fieldset class="rounded-md border border-slate-200 p-3">
        <legend class="px-1 text-sm font-semibold text-gray-700">Contact</legend>
        <label class="mb-1 mt-2 block text-sm text-gray-700" for="schema-email">Email</label>
        <input
          id="schema-email"
          type="email"
          class="mb-2 w-full rounded-md border border-gray-300 p-2"
          [formField]="customerForm.contact.email"
        />
        <label class="mb-1 block text-sm text-gray-700" for="schema-phone">Phone</label>
        <input
          id="schema-phone"
          type="tel"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="customerForm.contact.phone"
        />
        <app-demo-field-errors [field]="customerForm.contact()" />
      </fieldset>

      <div>
        <p class="mb-2 text-sm font-semibold text-gray-700">Extra addresses (applyEach)</p>
        @for (address of customerForm.addresses; track $index) {
          <div class="mb-2 grid gap-2 sm:grid-cols-3">
            <input
              type="text"
              [attr.aria-label]="'Extra street ' + ($index + 1)"
              class="rounded-md border border-gray-300 p-2"
              placeholder="Street"
              [formField]="address.street"
            />
            <input
              type="text"
              [attr.aria-label]="'Extra city ' + ($index + 1)"
              class="rounded-md border border-gray-300 p-2"
              placeholder="City"
              [formField]="address.city"
            />
            <input
              type="text"
              [attr.aria-label]="'Extra zip ' + ($index + 1)"
              class="rounded-md border border-gray-300 p-2"
              placeholder="12-345"
              [formField]="address.zipCode"
            />
          </div>
        }
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="schema-pay"
          >Payment method</label
        >
        <select
          id="schema-pay"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="customerForm.paymentMethod"
        >
          <option value="cash">Cash</option>
          <option value="card">Card</option>
        </select>
      </div>
      @if (customerForm.paymentMethod().value() === 'card') {
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700" for="schema-card"
            >Card number</label
          >
          <input
            id="schema-card"
            type="text"
            inputmode="numeric"
            class="w-full rounded-md border border-gray-300 p-2"
            [formField]="customerForm.payment.cardNumber"
          />
          <app-demo-field-errors [field]="customerForm.payment.cardNumber()" />
        </div>
      }

      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700" for="schema-doc"
          >Document type</label
        >
        <select
          id="schema-doc"
          class="w-full rounded-md border border-gray-300 p-2"
          [formField]="customerForm.document.type"
        >
          <option value="receipt">Receipt</option>
          <option value="invoice">Invoice</option>
        </select>
      </div>
      @if (customerForm.document.type().value() === 'invoice') {
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700" for="schema-invoice"
            >Invoice number</label
          >
          <input
            id="schema-invoice"
            type="text"
            class="w-full rounded-md border border-gray-300 p-2"
            [formField]="customerForm.document.invoiceNumber"
          />
          <app-demo-field-errors [field]="customerForm.document.invoiceNumber()" />
        </div>
      } @else {
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700" for="schema-receipt"
            >Receipt number</label
          >
          <input
            id="schema-receipt"
            type="text"
            class="w-full rounded-md border border-gray-300 p-2"
            [formField]="customerForm.document.receiptNumber"
          />
        </div>
      }
      <button type="submit" class="rounded-md bg-blue-500 px-3 py-2 text-white">Validate</button>
    </form>
    <pre class="mt-3 overflow-auto rounded bg-slate-50 p-2 text-xs text-slate-700">{{
      customerForm().value() | json
    }}</pre>
  `,
})
export class SchemaDemo {
  private readonly customerModel = signal({
    name: '',
    billingAddress: { street: '', city: '', zipCode: '' },
    shippingAddress: { street: '', city: '', zipCode: '' },
    contact: { email: '', phone: '' },
    addresses: [{ street: '', city: '', zipCode: '' }],
    paymentMethod: 'cash',
    payment: { cardNumber: '' },
    document: { type: 'receipt', invoiceNumber: '', receiptNumber: '' } as CustomerDocument,
  });

  readonly customerForm = form(
    this.customerModel,
    (customer) => {
      required(customer.name, { message: 'Name is required' });
      apply(customer.billingAddress, addressSchema);
      apply(customer.shippingAddress, addressSchema);
      apply(customer.contact, contactSchema);
      applyEach(customer.addresses, addressSchema);
      applyWhen(
        customer.payment,
        ({ valueOf }) => valueOf(customer.paymentMethod) === 'card',
        cardPaymentSchema,
      );
      applyWhenValue(customer.document, (doc) => doc.type === 'invoice', invoiceSchema);
    },
    {
      submission: {
        action: async () => undefined,
      },
    },
  );
}
