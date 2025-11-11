import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';

import { OrderStatus } from '../../models/types';
import { SignalService } from '../../services/signal.service';

@Component({
  selector: 'app-signals1',
  imports: [CommonModule],
  templateUrl: './signals1.component.html',
  styleUrl: './signals1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signals1Component implements OnInit {
  signalService = inject(SignalService);

  count = this.signalService.count;

  mySignal = signal({ foo: 'bar' });
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

  ngOnInit(): void {
    // Update order status triggers recomputation of prepareFoodValue
    this.orderStatus.set('cooking');

    // Simulate user login (you can replace this with actual login logic)
    this.userLoggedIn.set(true);
    // When user logs in, add dependency on user data (simulated by userDataSignal)
    computed(() => {
      if (this.userLoggedIn()) {
        // Add dependency
      } else {
        // Remove dependency }
      }
    });
    this.cartItemsSignal.update((items) => [...this.cartItemsSignal(), 'bread']);
  }

  setNewValue() {
    this.mySignal.set({ foo: 'bar1' });
  }

  updateValue() {
    const currentValue = this.mySignal();
    this.mySignal.set({ ...currentValue, foo: currentValue.foo + 'x' });
  }

  doubleCountValue = computed(() => {
    return this.count() * 2;
  });

  incrementCount() {
    this.signalService.incrementCount();
  }

  // Create a computed signal (derived from order status) for food preparation
  prepareFoodValue = computed(() => {
    return this.orderStatus() === 'placed' ? 'preparing' : 'idle';
  });

  showProfileValue = computed(() => {
    return this.userLoggedIn() ? 'Yes' : 'No';
  });

  areObjectsEqual = computed(() => {
    return this.myObject() === this.mySignal;
  });
}
