import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';

import { SignalService } from '../signal.service';
import { User } from '../../models/types';

@Component({
  selector: 'app-signals1',
  imports: [CommonModule],
  templateUrl: './signals1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signals1Component {
  signalService = inject(SignalService);

  count = this.signalService.count;
  userLoggedIn = this.signalService.userLoggedIn;

  doubleCountValue = computed(() => {
    return this.count() * 2;
  });

  incrementCount() {
    this.signalService.incrementCount();
  }

  user = signal<User>({
    name: 'Alice',
    age: 25,
  });

  name = computed(() => this.user().name);
  age = computed(() => this.user().age);

  updateName() {
    const i = Math.floor(Math.random() * names.length);
    this.user.update((user) => ({
      ...user,
      name: names[i],
    }));
  }

  updateAge() {
    setTimeout(() => {
      this.user.update((user) => ({
        ...user,
        age: Math.floor(Math.random() * 70 + 20),
      }));
    }, 1);
  }
}

const names = [
  'Bob',
  'Max',
  'Emma',
  'Marti',
  'Neus',
  'Ona',
  'Marina',
  'Jordi',
  'Andreu',
  'Marc',
  'Jana',
  'Montse',
  'Berta',
  'Mariona',
];
