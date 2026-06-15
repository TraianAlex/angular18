import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreditCardImageDirective } from '../../shared/directives/ccLogo/cclogo.directive';
import { ActiveDirective, SampleDirective2 } from '../../shared/directives/active-button/active.directive';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.html',
  styleUrl: './directives.scss',
  imports: [FormsModule, CreditCardImageDirective, ActiveDirective, SampleDirective2],
})
export class DirectivesComponent {
  cardNumber = signal('');

  isActive = signal(true);

  updateCardNumber(value: string) {
    this.cardNumber.set(value);
  }

  toggleActive() {
    this.isActive.update((active) => !active);
  }
}
