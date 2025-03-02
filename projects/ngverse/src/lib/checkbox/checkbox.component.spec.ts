import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CheckboxIconComponent } from './checkbox-icon.component';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let fixture: ComponentFixture<CheckboxTestComponent>;
  let debugElement: DebugElement;
  let rootComponent: CheckboxTestComponent;
  let checkboxComponent: CheckboxComponent;
  let checkboxElement: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CheckboxComponent],
      providers: [
        provideNoopAnimations(),
        provideExperimentalZonelessChangeDetection(),
      ],
    });
    fixture = TestBed.createComponent(CheckboxTestComponent);
    debugElement = fixture.debugElement;
    rootComponent = fixture.componentInstance;
    checkboxComponent = debugElement.query(By.directive(CheckboxComponent))
      .componentInstance as CheckboxComponent;
    checkboxElement = debugElement.query(
      By.directive(CheckboxComponent)
    ).nativeElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(checkboxComponent).toBeTruthy();
  });

  it('icon should be checked when value is true', async () => {
    rootComponent.formControl.setValue(true);
    await fixture.whenStable();
    const checkboxIcon = fixture.debugElement.query(
      By.directive(CheckboxIconComponent)
    );
    expect(checkboxIcon.componentInstance.checked).toBeTruthy();
  });
  it('checkbox should be invalid with formControl required', async () => {
    rootComponent.formControl.setValidators(Validators.required);
    rootComponent.formControl.setValue(null);
    await fixture.whenStable();
    expect(checkboxElement).toHaveClass('ng-invalid');
  });
  it('checkbox should be invalid with required true', async () => {
    rootComponent.required.set(true);
    await fixture.whenStable();
    expect(checkboxElement).toHaveClass('ng-invalid');
  });

  it("ng-content should be 'Test checkbox'", async () => {
    expect(checkboxElement.textContent?.trim()).toBe('Test checkbox');
  });
});

@Component({
  imports: [CheckboxComponent, ReactiveFormsModule],
  template: `<app-checkbox [required]="required" [formControl]="formControl">
    Test checkbox
  </app-checkbox>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CheckboxTestComponent {
  formControl = new FormControl();
  required = signal(false);
}
