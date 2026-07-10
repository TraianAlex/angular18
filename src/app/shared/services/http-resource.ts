// import { httpResource } from '@angular/common/http';
// import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
// import { Flight } from '../../data/flight';

// @Component({
//   selector: 'app-flight-search',
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   [...]
// })
// export class FlightSearch {
//   protected readonly filter = signal({ from: 'Hamburg', to: 'Graz' });

//   protected readonly flightsResource = httpResource<Flight[]>(
//     () => ({
//       url: 'https://demo.angulararchitects.io/api/flight',
//       params: {
//         from: this.filter().from,
//         to: this.filter().to,
//       },
//     }),
//     { defaultValue: [] },
//   );

//   protected readonly flights = this.flightsResource.value;
//   protected readonly error = this.flightsResource.error;
//   protected readonly isLoading = this.flightsResource.isLoading;

//   protected search(): void {
//     this.flightsResource.reload();
//   }
// }

// protected readonly flightsResource = httpResource<Flight[]>(
//   () => {
//     const filter = this.filter();
//     if (!filter.from || !filter.to) {
//       return undefined;
//     }
//     return {
//       url: 'https://demo.angulararchitects.io/api/flight',
//       params: { from: filter.from, to: filter.to },
//     };
//   },
//   { defaultValue: [] },
// );

/*
@if (flightsResource.isLoading()) {
  <div>Loading ...</div>
}

@if (flightsResource.error()) {
  <div>Error: {{ flightsResource.error() }}</div>
} @else {
  <div class="row">
    @for (flight of flightsResource.value(); track flight.id) {
      <app-flight-card [item]="flight" />
    }
  </div>
}
  */