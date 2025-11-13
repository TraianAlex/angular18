import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Signals2Component } from '../signals2/signals2.component';

export type User = {
  name: string;
  age: number;
};

@Component({
  selector: 'app-signals',
  imports: [Signals2Component],
  templateUrl: './signals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalsComponent {
  clicks = 0;

  eventReceived() {
    this.clicks++;
  }

  // bug: this is not a signal
  user = {
    name: 'Alice',
    age: 25,
  };

  updateName() {
    const i = Math.floor(Math.random() * names.length);
    this.user.name = names[i];
  }

  // updateAge() {
  //   this.user.age = Math.floor(Math.random() * 20 + 20);
  // }
  updateAge() {
    // Any asynchronous code.
    // we are loading the allowed ages list.
    setTimeout(() => {
      this.user.age = Math.floor(Math.random() * 70 + 20);
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
