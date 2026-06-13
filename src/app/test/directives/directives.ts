import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreditCardImageDirective } from '../../shared/directives/ccLogo/cclogo.directive';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.html',
  styleUrl: './directives.scss',
  imports: [FormsModule, CreditCardImageDirective],
})
export class DirectivesComponent {
  cardNumber = signal('');

  updateCardNumber(value: string) {
    this.cardNumber.set(value);
  }
}
