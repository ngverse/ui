import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CheckboxIconComponent } from './checkbox-icon.component';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let fixture: ComponentFixture<CheckboxTestComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let rootComponent: CheckboxTestComponent;
  let checkboxComponent: CheckboxComponent;
  let checkboxRootElement: HTMLElement;
  let checkboxNativeElement: HTMLElement;
  let checkboxElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckboxComponent],
    });
    fixture = TestBed.createComponent(CheckboxTestComponent);
    debugElement = fixture.debugElement;
    htmlElement = fixture.debugElement.nativeElement;
    rootComponent = fixture.componentInstance;
    checkboxComponent = debugElement.query(By.directive(CheckboxComponent))
      .componentInstance as CheckboxComponent;
    checkboxElement = debugElement.query(
      By.directive(CheckboxComponent)
    ).nativeElement;
    checkboxRootElement = htmlElement.querySelector('.checkbox') as HTMLElement;
    checkboxNativeElement = htmlElement.querySelector('input') as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(checkboxComponent).toBeTruthy();
  });
  it('should disable checkbox with disable true', () => {
    checkboxComponent.disabled.set(true);
    fixture.detectChanges();
    expect(checkboxRootElement.classList).toContain('disabled');
  });
  it('should be true on change', () => {
    checkboxNativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(rootComponent.formControl.value).toBeTrue();
  });
  it('icon should be checked when value is true', () => {
    rootComponent.formControl.setValue(true);
    fixture.detectChanges();
    const checkboxIcon = fixture.debugElement.query(
      By.directive(CheckboxIconComponent)
    );
    expect(checkboxIcon.componentInstance.checked).toBeTruthy();
  });
  it('checkbox should be invalid with formControl required', () => {
    rootComponent.formControl.setValidators(Validators.required);
    rootComponent.formControl.setValue(null);
    fixture.detectChanges();
    expect(checkboxElement).toHaveClass('ng-invalid');
  });
  it('checkbox should be invalid with required true', () => {
    rootComponent.required.set(true);
    fixture.detectChanges();
    expect(checkboxElement).toHaveClass('ng-invalid');
  });

  it('id input should change the id of the input element', () => {
    const id = 'test-id';
    rootComponent.id.set(id);
    fixture.detectChanges();
    expect(checkboxNativeElement.id).toBe(id);
  });
  it("ng-content should be 'Test checkbox'", () => {
    expect(checkboxElement.textContent?.trim()).toBe('Test checkbox');
  });
});

@Component({
  imports: [CheckboxComponent, ReactiveFormsModule],
  template: `<app-checkbox
    [id]="id()"
    [required]="required"
    [formControl]="formControl"
  >
    Test checkbox
  </app-checkbox>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CheckboxTestComponent {
  formControl = new FormControl();
  required = signal(false);
  id = signal<string | undefined>(undefined);
}
