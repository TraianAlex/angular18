import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';

import { Book } from '../../models/types';

@Component({
  selector: 'app-signals2',
  imports: [AsyncPipe],
  templateUrl: './signals2.component.html',
  styleUrl: './signals2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signals2Component {
  name = input<string>('World');
  title = viewChild<ElementRef>('title');

  greetingClicked = output<string>();
  // outputToObservable() turns an OutputRef (the new object returned by the output() function) into an Observable
  greetingClicked$ = outputToObservable(this.greetingClicked);

  greeting = computed(() => 'Hello ' + this.name());

  book = signal<Book>({
    title: 'Angular Core Deep Dive',
    synopsis: 'A deep dive into the core features of Angular.',
  });

  constructor() {
    effect(() => {
      console.log('Title: ', this.title()?.nativeElement);
    });
  }

  // deleteBook output emits the book when it's deleted
  deleteBook = output<Book>();

  deleteBookHandler() {
    this.book.set({
      title: '',
      synopsis: '',
    });
  }
}
