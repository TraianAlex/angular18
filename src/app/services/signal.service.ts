import { computed, Injectable } from '@angular/core';
import { signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { OrderStatus } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  userLoggedInSignal = signal<boolean>(false);
  userLoggedIn = this.userLoggedInSignal.asReadonly();

  mySignal: WritableSignal<{ foo: string }> = signal({ foo: 'bar' });
  mySign = this.mySignal.asReadonly();
  setNewValueSignal() {
    this.mySignal.set({ foo: 'bar1' });
  }

  updateValueSignal() {
    const currentValue = this.mySignal();
    this.mySignal.set({ ...currentValue, foo: currentValue.foo + 'x' });
  }

  orderStatusSignal = signal<OrderStatus>('placed');
  orderStatus = this.orderStatusSignal.asReadonly();

  cartItemsSignal = signal<string[]>([]);
  myObject = signal(
    {
      name: 'name1',
    },
    {
      equal: (a: { name: any }, b: { name: any }) => a.name === b.name,
    }
  );

  rates$!: Observable<any>;
  private rateSignal!: ReturnType<typeof toSignal>;

  constructor(private http: HttpClient) {
    // Initialize rates$ after http is available
    this.rates$ = this.http.get('http://localhost:3000/rates');
    this.rateSignal = toSignal(this.rates$, { initialValue: { USD: 1, GBP: 1, EUR: 1 } });

    // Update order status triggers recomputation of prepareFoodValue
    this.orderStatusSignal.set('cooking');

    // Simulate user login (you can replace this with actual login logic)
    this.userLoggedInSignal.set(true);
    // When user logs in, add dependency on user data (simulated by userDataSignal)
    computed(() => {
      if (this.userLoggedInSignal()) {
        // Add dependency
      } else {
        // Remove dependency
      }
    });
    this.cartItemsSignal.update((items) => [...this.cartItemsSignal(), 'bread']);
  }

  sendSignal(): Observable<any> {
    return this.http.post<any>('http://localhost:3000/signal', this.mySignal);
  }

  receiveSignal(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/signal');
  }

  countSignal = signal<number>(1);
  count = this.countSignal.asReadonly();
  incrementCount() {
    this.countSignal.set(this.countSignal() + 1);
  }
}
