import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';
import { CountryService } from './services/country.service';

@Component({
  selector: 'app-country',
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './country.html',
  styleUrls: ['./country.scss'],
})
export class Country {
  countries$ = inject(CountryService).getAllCountries();
  filter = new FormControl<string>('');

  filteredCountries$ = combineLatest([
    this.countries$,
    this.filter.valueChanges.pipe(startWith(this.filter.value ?? '')),
  ]).pipe(
    map(([countries, filter]) =>
      countries.filter((country) => country.name.toLowerCase().includes(filter?.toLowerCase() ?? '')),
    ),
  );
}
