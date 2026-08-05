import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ConfiguratorService } from '../configurator.service';
import { CurrencyPipe } from '../../shared/pipes/currency.pipe';

@Component({
  selector: 'app-step3',
  imports: [CurrencyPipe],
  templateUrl: './step3.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './step3.component.scss',
})
export class Step3Component {
  service = inject(ConfiguratorService);
}
