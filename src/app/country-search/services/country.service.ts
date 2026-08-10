import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../types/data.types';
import { ALL_COUNTRIES } from '../mocks';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  getAllCountries(): Observable<Country[]> {
    return of(ALL_COUNTRIES);
  }
}
