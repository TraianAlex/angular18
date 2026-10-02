import { Component } from '@angular/core';
import { BuiltInDemo } from './built-in-demo';
import { CustomDemo } from './custom-demo';
import { AsyncDemo } from './async-demo';
import { ConditionsDemo } from './conditions-demo';
import { SchemaDemo } from './schema-demo';
import { StandardSchemaDemo } from './standard-schema-demo';
import { ControlsDemo } from './controls-demo';
import { CompatDemo } from './compat-demo';

@Component({
  selector: 'app-demo-validation',
  imports: [
    BuiltInDemo,
    CustomDemo,
    AsyncDemo,
    ConditionsDemo,
    SchemaDemo,
    StandardSchemaDemo,
    ControlsDemo,
    CompatDemo,
  ],
  templateUrl: './demo-validation.html',
})
export class DemoValidationComponent {}
