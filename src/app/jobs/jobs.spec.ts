import { TestBed } from '@angular/core/testing';
import { JobsComponent } from './jobs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(JobsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'ng' title`, () => {
    const fixture = TestBed.createComponent(JobsComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ng');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(JobsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, ng');
  });
});
