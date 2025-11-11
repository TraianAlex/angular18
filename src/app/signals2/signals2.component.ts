import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, input, output, viewChild } from '@angular/core';
import { outputFromObservable, outputToObservable } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Book } from '../models/types';

@Component({
    selector: 'app-signals2',
    imports: [AsyncPipe],
    templateUrl: './signals2.component.html',
    styleUrl: './signals2.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Signals2Component {
  name = input<string>('World');
  title = viewChild<ElementRef>('title');

  greetingClicked = output<string>();
  // outputToObservable() turns an OutputRef (the new object returned by the output() function) into an Observable
  greetingClicked$ = outputToObservable(this.greetingClicked);

  greeting = computed(() => 'Hello ' + this.name());

  constructor() {
    effect(() => {
      console.log('Title: ', this.title()?.nativeElement);
    });
  }

  // TODO: Implement the deleteBook signal
  // outputFromObservable() turns an Observable into an OutputRef
  deleteBook = outputFromObservable<Book>(
    of({
      title: 'Angular Core Deep Dive',
      synopsis: 'A deep dive into the core features of Angular.',
    })
  );
}
