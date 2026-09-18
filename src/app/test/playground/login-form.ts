import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormRoot, FormField, validateStandardSchema } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import * as z from 'zod';
import { UserService } from './user.service';
import { registerUniqueEmailValidation } from './validators/email-unique.validator';
import { BasicToggle } from './basic-toggle/basic-toggle';

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  rememberMe: z.boolean(),
});

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormRoot, FormField, JsonPipe, BasicToggle],
})
export class LoginFormComponent {
  userService = inject(UserService);

  model = signal<{ email: string; password: string; rememberMe: boolean }>({
    email: '',
    password: '',
    rememberMe: false,
  });
  loginForm = form(
    this.model,
    (schemaPath) => {
      validateStandardSchema(schemaPath, loginSchema);
      registerUniqueEmailValidation(schemaPath.email);
    },
    {
      submission: {
        action: async (form) => {
          try {
            await this.userService.saveLoginInfo(form().value());
            form().reset({ email: '', password: '', rememberMe: false });
            return;
          } catch {
            return { kind: 'serverError', message: 'Failed to save login info' };
          }
        },
        onInvalid: () => {
          console.log('Invalid login');
        },
      },
    },
  );

  constructor() {
    // this.model.set({ email: 'test@test.com', password: 'password' });
    // this.loginForm().value.set({ email: 'test2@test.com', password: 'password2' });
    // this.loginForm.email().value.set('test3@test.com');
    // this.loginForm.password().value.set('password3');
  }
}
