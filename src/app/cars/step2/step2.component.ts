import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ConfiguratorService } from '../configurator.service';
import { CurrencyPipe } from '../../shared/pipes/currency.pipe';

@Component({
  selector: 'app-step2',
  imports: [CurrencyPipe],
  templateUrl: './step2.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './step2.component.scss',
})
export class Step2Component {
  service = inject(ConfiguratorService);
}
