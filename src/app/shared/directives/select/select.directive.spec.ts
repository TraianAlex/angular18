import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { SelectDirective } from './select.directive';

describe('SelectDirective', () => {
  it('should create an instance', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TemplateRef, useValue: {} },
        { provide: ViewContainerRef, useValue: { createEmbeddedView: () => undefined } },
      ],
    });

    const directive = TestBed.runInInjectionContext(() => new SelectDirective());
    expect(directive).toBeTruthy();
  });
});
