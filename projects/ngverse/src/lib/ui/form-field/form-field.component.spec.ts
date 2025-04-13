import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ErrorComponent } from './error.component';
import { FormFieldErrorRegistry } from './form-field-error.registry';
import { FormFieldComponent } from './form-field.component';
import { LabelComponent } from './label.component';

describe('FormFieldComponent', () => {
  let component: FormFieldTestComponent;
  let fixture: ComponentFixture<FormFieldTestComponent>;
  let formControl: FormControl;
  let errorRegistry: FormFieldErrorRegistry;

  function labelEl() {
    return (fixture.nativeElement as HTMLElement).querySelector(
      'label'
    ) as HTMLElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldTestComponent],
      providers: [
        provideNoopAnimations(),
        provideExperimentalZonelessChangeDetection(),
        FormFieldErrorRegistry,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldTestComponent);
    component = fixture.componentInstance;
    formControl = component.formControl;
    errorRegistry = TestBed.inject(FormFieldErrorRegistry);
  });
  function expectErrorContentIsEmpty(onlyCustom?: boolean) {
    expect(fixture.nativeElement.querySelector('div > div').textContent).toBe(
      onlyCustom ? 'I am error' : ''
    );
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display app-label inside label', () => {
    expect(labelEl().textContent).toContain('I am label');
  });
  it('should display input inside label', () => {
    expect(labelEl().querySelector('input')).toBeTruthy();
  });

  it('should not display anything when is valid', () => {
    expectErrorContentIsEmpty();
  });
  it('should not display anything when is invalid but not touched', async () => {
    formControl.setValidators(Validators.required);
    formControl.setValue(null);
    await fixture.whenStable();
    expect(formControl.invalid).toBeTrue();
    expectErrorContentIsEmpty();
  });
  it("should not display anything if it's touched but valid", async () => {
    formControl.markAsTouched();
    await fixture.whenStable();
    expectErrorContentIsEmpty();
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
    expectErrorContentIsEmpty(true);
  });
});

@Component({
  template: `
    <app-form-field [silentErrors]="silentErrors()">
      <app-label>I am label</app-label>
      <input type="text" [formControl]="formControl" />
      <app-error>I am error</app-error>
    </app-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormFieldComponent,
    LabelComponent,
    ReactiveFormsModule,
    ErrorComponent,
  ],
})
export class FormFieldTestComponent {
  formControl = new FormControl();
  silentErrors = signal<string[] | undefined>(undefined);
}
