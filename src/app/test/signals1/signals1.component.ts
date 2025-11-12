import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';

import { SignalService } from '../../services/signal.service';

@Component({
  selector: 'app-signals1',
  imports: [CommonModule],
  templateUrl: './signals1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signals1Component implements OnInit {
  signalService = inject(SignalService);

  count = this.signalService.count;
  userLoggedIn = this.signalService.userLoggedIn;
  orderStatus = this.signalService.orderStatus;
  mySignal = this.signalService.mySign;

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
    this.signalService.setNewValueSignal();
  }

  updateValue() {
    this.signalService.updateValueSignal();
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
