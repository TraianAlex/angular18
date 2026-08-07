import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ConfiguratorService } from '../configurator.service';
import { CurrencyPipe } from '../../shared/pipes/currency.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step3',
  imports: [CurrencyPipe],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss',
})
export class Step3Component {
  router = inject(Router);
  service = inject(ConfiguratorService);

  reset() {
    this.service.reset();
    this.router.navigateByUrl('/cars/step1');
  }
}
