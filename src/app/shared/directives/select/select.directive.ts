import { Directive, OnInit, TemplateRef, ViewContainerRef, inject, input } from '@angular/core';
import { DataSource, SelectSource } from './select-source';

@Directive({
  selector: '[select]',
})
export class SelectDirective implements OnInit {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  selectFrom = input.required<SelectSource<unknown>>();

  async ngOnInit() {
    const source = this.selectFrom();
    const data = this.isDataSource(source) ? await source.load() : source();

    this.viewContainerRef.createEmbeddedView(this.templateRef, {
      $implicit: data,
    });
  }

  private isDataSource(source: SelectSource<unknown>): source is DataSource<unknown> {
    return typeof (source as DataSource<unknown>).load === 'function';
  }
}
