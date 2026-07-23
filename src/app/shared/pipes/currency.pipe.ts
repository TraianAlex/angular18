import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
  standalone: true,
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number | string | null | undefined, currencyCode = 'USD', locale = 'en-US'): string {
    if (value == null || value === '') {
      return '';
    }

    const amount = typeof value === 'number' ? value : Number(value);
    if (Number.isNaN(amount)) {
      return '';
    }

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  }
}
