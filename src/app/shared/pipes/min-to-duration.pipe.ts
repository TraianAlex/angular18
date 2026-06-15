import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minToDuration',
})
export class MinToDurationPipe implements PipeTransform {
  transform(minutes?: string): string {
    if (!minutes) return '';
    const hours = Math.floor(+minutes / 60);
    const min = +minutes % 60;
    return `${hours}h ${min}min`;
  }
}
