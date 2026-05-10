import { computed, inject, Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  private http = inject(HttpClient);

  userLoggedInSignal = signal<boolean>(false);
  userLoggedIn = this.userLoggedInSignal.asReadonly();

  myObject = signal(
    {
      name: 'name1',
    },
    {
      equal: (a: { name: any }, b: { name: any }) => a.name === b.name,
    },
  );

  rates$!: Observable<any>;
  private rateSignal!: ReturnType<typeof toSignal>;

  constructor() {
    this.rates$ = this.http.get('http://localhost:3000/rates');
    this.rateSignal = toSignal(this.rates$, { initialValue: { USD: 1, GBP: 1, EUR: 1 } });
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
  }

  sendSignal(): Observable<any> {
    return this.http.post<any>('http://localhost:3000/signal', this.myObject);
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
