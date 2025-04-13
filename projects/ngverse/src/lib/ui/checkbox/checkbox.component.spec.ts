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
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let fixture: ComponentFixture<CheckboxTestComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let rootComponent: CheckboxTestComponent;
  let checkboxComponent: CheckboxComponent;
  let checkboxNativeElement: HTMLElement;
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
    htmlElement = fixture.debugElement.nativeElement;
    rootComponent = fixture.componentInstance;
    checkboxComponent = debugElement.query(By.directive(CheckboxComponent))
      .componentInstance as CheckboxComponent;
    checkboxElement = debugElement.query(
      By.directive(CheckboxComponent)
    ).nativeElement;
    checkboxNativeElement = htmlElement.querySelector('input') as HTMLElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(checkboxComponent).toBeTruthy();
  });
  it('should disable checkbox with disable true', async () => {
    checkboxComponent.disabled.set(true);
    await fixture.whenStable();
    expect(checkboxElement.classList).toContain('disabled');
  });
  it('should be true on change', async () => {
    checkboxNativeElement.dispatchEvent(new Event('change'));
    await fixture.whenStable();
    expect(rootComponent.formControl.value).toBeTrue();
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

  it('id input should change the id of the input element', async () => {
    const id = 'test-id';
    rootComponent.id.set(id);
    await fixture.whenStable();
    expect(checkboxNativeElement.id).toBe(id);
  });
  it("ng-content should be 'Test checkbox'", async () => {
    expect(checkboxElement.textContent?.trim()).toContain('Test checkbox');
  });
});

@Component({
  imports: [CheckboxComponent, ReactiveFormsModule],
  template: `<app-checkbox
    [inputId]="id()"
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
