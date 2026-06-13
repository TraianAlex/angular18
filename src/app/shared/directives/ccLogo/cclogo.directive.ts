import { Directive, HostBinding, effect, input } from '@angular/core';

enum CardType {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
  AMERICAN_EXPRESS = 'american-express',
  UNKNOWN = 'unknown',
}

@Directive({
  selector: 'img[ccLogo]',
  standalone: true,
})
export class CreditCardImageDirective {
  @HostBinding('src')
  imageSource = '';

  cardNumber = input<string>('');

  constructor() {
    effect(() => {
      this.imageSource = `assets/card-types/${this.getCardTypeFromNumber()}.png`;
    });
  }

  getCardTypeFromNumber(): CardType {
    const cardNumber = this.cardNumber();
    if (cardNumber) {
      if (cardNumber.startsWith('37')) {
        return CardType.AMERICAN_EXPRESS;
      } else if (cardNumber.startsWith('4')) {
        return CardType.VISA;
      } else if (cardNumber.startsWith('5')) {
        return CardType.MASTERCARD;
      }
    }
    return CardType.UNKNOWN;
  }
}
