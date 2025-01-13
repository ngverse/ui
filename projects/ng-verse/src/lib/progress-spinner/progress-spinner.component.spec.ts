import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ProgressSpinnerComponent } from './progress-spinner.component';

describe('ProgressSpinnerComponent', () => {
  let component: ProgressSpinnerTestComponent;
  let fixture: ComponentFixture<ProgressSpinnerTestComponent>;
  let rootElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressSpinnerTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressSpinnerTestComponent);
    component = fixture.componentInstance;
    rootElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set width and height by radius innput', () => {
    component.radius.set(100);
    fixture.detectChanges();
    const loader = rootElement.querySelector('.loader') as HTMLElement;

    expect(loader.clientWidth).toBe(100);
    expect(loader.clientHeight).toBe(100);
  });
});

@Component({
  imports: [ProgressSpinnerComponent],
  template: `<app-progress-spinner [radius]="radius()">
  </app-progress-spinner>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ProgressSpinnerTestComponent {
  radius = signal<number | undefined>(undefined);
}
