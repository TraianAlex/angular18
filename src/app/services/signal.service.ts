import { computed, inject, Injectable } from '@angular/core';
import { signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderStatus } from '../models/types';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  private http = inject(HttpClient);
  mySignal: WritableSignal<{ foo: string }> = signal({ foo: 'bar' });
  count = signal<number>(1);
  orderStatus = signal<OrderStatus>('placed');
  userLoggedIn = signal<boolean>(false);
  cartItemsSignal = signal<string[]>([]);
  myObject = signal(
    {
      name: 'name1',
    },
    {
      equal: (a: { name: any }, b: { name: any }) => a.name === b.name,
    }
  );

  constructor() {
    // Update order status triggers recomputation of prepareFoodValue
    this.orderStatus.set('cooking');

    // Simulate user login (you can replace this with actual login logic)
    this.userLoggedIn.set(true);
    // When user logs in, add dependency on user data (simulated by userDataSignal)
    computed(() => {
      if (this.userLoggedIn()) {
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

  rates$ = this.http.get('http://localhost:3000/rates');
  private rateSignal = toSignal(this.rates$, { initialValue: { USD: 1, GBP: 1, EUR: 1 } });
}
