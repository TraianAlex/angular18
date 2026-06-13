import { Signal } from '@angular/core';

export interface DataSource<T> {
  load(): Promise<T>;
}

export type SelectSource<T> = DataSource<T> | Signal<T>;
