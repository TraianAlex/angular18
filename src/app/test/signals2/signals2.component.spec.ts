import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Signals2Component } from './signals2.component';

describe('Signals2Component', () => {
  let component: Signals2Component;
  let fixture: ComponentFixture<Signals2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Signals2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Signals2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
