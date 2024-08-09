import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Signals1Component } from './signals1.component';

describe('Signals1Component', () => {
  let component: Signals1Component;
  let fixture: ComponentFixture<Signals1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Signals1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Signals1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
