import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginFormComponent } from './login-form';
import { OrderFormComponent } from './order-form';
import { UserInfoComponent } from './user-info';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoginFormComponent, OrderFormComponent, UserInfoComponent],
})
export class PlaygroundComponent {}
