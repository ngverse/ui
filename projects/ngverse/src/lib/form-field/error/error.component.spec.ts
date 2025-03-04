import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorTestComponent],
      providers: [
        provideNoopAnimations(),
        provideExperimentalZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorTestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display content', () => {
    expect(fixture.nativeElement.textContent).toContain('I am error');
  });
});

@Component({
  imports: [ErrorComponent],
  template: ` <app-error>I am error</app-error> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorTestComponent {}
