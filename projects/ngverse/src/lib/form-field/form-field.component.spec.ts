import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ErrorGroupComponent } from './error-group/error-group.component';
import { ErrorComponent } from './error/error.component';
import { FormFieldComponent } from './form-field.component';
import { LabelComponent } from './label/label.component';

describe('FormFieldComponent', () => {
  let component: FormFieldTestComponent;
  let fixture: ComponentFixture<FormFieldTestComponent>;

  function labelEl() {
    return (fixture.nativeElement as HTMLElement).querySelector(
      'label'
    ) as HTMLElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldTestComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display app-label inside label', () => {
    expect(labelEl().textContent).toContain('I am label');
  });
  it('should display input inside label', () => {
    expect(labelEl().querySelector('input')).toBeTruthy();
  });
  it('should display app-error', () => {
    expect(fixture.nativeElement.querySelector('app-error')).toBeTruthy();
  });
  it('should display error-group', () => {
    expect(fixture.nativeElement.querySelector('app-error-group')).toBeTruthy();
  });
});

@Component({
  template: `
    <app-form-field>
      <app-label>I am label</app-label>
      <input type="text" [formControl]="formControl" />
      <app-error>I am error</app-error>
      <app-error-group [control]="formControl"> </app-error-group>
    </app-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormFieldComponent,
    LabelComponent,
    ReactiveFormsModule,
    ErrorComponent,
    ErrorGroupComponent,
  ],
})
export class FormFieldTestComponent {
  formControl = new FormControl();
}
