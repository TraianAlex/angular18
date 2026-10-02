import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFormComponent } from './login-form';
import { OrderFormComponent } from './order-form';
import { UserInfoComponent } from './user-info';
import { DemoValidationComponent } from './demo-validation/demo-validation';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoginFormComponent, OrderFormComponent, UserInfoComponent, DemoValidationComponent],
})
export class PlaygroundComponent {}
