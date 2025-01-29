import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { FormFieldErrorRegistry } from '../form-field-error.registry';
import { ErrorGroupComponent } from './error-group.component';

describe('ErrorGroupComponent', () => {
  let component: ErrorGroupTestComponent;
  let formControl: FormControl;
  let fixture: ComponentFixture<ErrorGroupTestComponent>;
  let errorRegistry: FormFieldErrorRegistry;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorGroupTestComponent],
      providers: [
        provideNoopAnimations(),
        provideExperimentalZonelessChangeDetection(),
        FormFieldErrorRegistry,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorGroupTestComponent);
    component = fixture.componentInstance;
    formControl = component.formControl;
    errorRegistry = TestBed.inject(FormFieldErrorRegistry);
  });

  function expectContentIsEmpty() {
    expect(fixture.nativeElement.textContent).toBe('');
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should not display anything when is valid', () => {
    expectContentIsEmpty();
  });
  it('should not display anything when is invalid but not touched', async () => {
    formControl.setValidators(Validators.required);
    formControl.setValue(null);
    await fixture.whenStable();
    expect(formControl.invalid).toBeTrue();
    expectContentIsEmpty();
  });
  it("should not display anything if it's touched but valid", async () => {
    formControl.markAsTouched();
    await fixture.whenStable();
    expectContentIsEmpty();
  });
  it("should display error if it's touched and invalid", async () => {
    formControl.setValidators(Validators.required);
    formControl.setValue(null);
    formControl.markAsTouched();
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).not.toBeFalsy();
  });
  it('should display correct error message', async () => {
    const errorMessage = 'This is required';
    errorRegistry.addErrors({ required: errorMessage });
    formControl.setValidators(Validators.required);
    formControl.setValue(null);
    formControl.markAsTouched();
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain(errorMessage);
  });
  it('should silent errors', async () => {
    const errorMessage = 'This is required';
    formControl.setValidators(Validators.required);
    formControl.setValue(null);
    formControl.markAsTouched();
    errorRegistry.addErrors({ required: errorMessage });
    component.silentErrors.set(['required']);
    await fixture.whenStable();
    expectContentIsEmpty();
  });
});

@Component({
  imports: [ErrorGroupComponent],
  template: `<app-error-group
    [control]="formControl"
    [silentErrors]="silentErrors()"
  ></app-error-group>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorGroupTestComponent {
  formControl = new FormControl();
  silentErrors = signal<string[] | undefined>(undefined);
}
