import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-signals2',
  imports: [AsyncPipe],
  templateUrl: './signals2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signals2Component {
  name = input<string>('World');
  title = viewChild<ElementRef>('title');

  greetingClicked = output<string>();
  // outputToObservable() turns an OutputRef (the new object returned by the output() function) into an Observable
  greetingClicked$ = outputToObservable(this.greetingClicked);

  greeting = computed(() => this.name());

  constructor() {
    effect(() => {
      console.log('Title: ', this.title()?.nativeElement);
    });
  }
}
