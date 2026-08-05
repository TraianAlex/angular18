import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `<div appHighlight="red"></div>`,
  imports: [HighlightDirective],
})
class HostComponent {}

describe('HighlightDirective', () => {
  it('should create an instance', async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const directive = fixture.debugElement
      .query(By.directive(HighlightDirective))
      .injector.get(HighlightDirective);

    expect(directive).toBeTruthy();
  });
});
