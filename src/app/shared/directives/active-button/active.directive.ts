import { Directive, HostBinding, HostListener, effect, input } from '@angular/core';

@Directive({
  selector: 'button[isActive]',
})
export class ActiveDirective {
  @HostBinding('class.my-btn')
  myBtn = true;

  @HostBinding('class.isActive')
  isActiveClass = false;

  @HostBinding('attr.disabled')
  disabled: true | null = true;

  isActive = input<boolean>(false);

  constructor() {
    effect(() => {
      const active = this.isActive();
      this.isActiveClass = active;
      this.disabled = active ? null : true;
    });
  }
}

/**
 * <button [isActive]="saved || hasError">Click me</button>
 */
//--------------------------------
/**
 * <button [class]="myClasses" [disabled]="!active">Click me</button>
 */
@Directive({
  selector: 'button[appSample]',
})
export class SampleDirective {
  @HostBinding('class')
  myClasses = 'blueBg whiteTxt';

  @HostBinding('attr.disabled')
  notActive = false;
}

/**
 * <button (click)="submit()">Submit</button>
 */
@Directive({
  selector: 'button[appSample2]',
})
export class SampleDirective2 {
  @HostListener('click')
  submit() {
    console.log('submit');
  }
}
