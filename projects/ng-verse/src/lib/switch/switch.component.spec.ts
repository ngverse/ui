import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SwitchComponent } from './switch.component';

describe('SwitchComponent', () => {
  let fixture: ComponentFixture<SwitchTestComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let rootComponent: SwitchTestComponent;
  let switchComponent: SwitchComponent;
  let switchRootElement: HTMLElement;
  let switchNativeElement: HTMLElement;
  let switchElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SwitchComponent],
    });
    fixture = TestBed.createComponent(SwitchTestComponent);
    debugElement = fixture.debugElement;
    htmlElement = fixture.debugElement.nativeElement;
    rootComponent = fixture.componentInstance;
    switchComponent = debugElement.query(By.directive(SwitchComponent))
      .componentInstance as SwitchComponent;
    switchElement = debugElement.query(
      By.directive(SwitchComponent)
    ).nativeElement;
    switchRootElement = htmlElement.querySelector('.switch') as HTMLElement;
    switchNativeElement = htmlElement.querySelector('button') as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(switchComponent).toBeTruthy();
  });
  it('should disable switch with disable true', () => {
    switchComponent.disabled.set(true);
    fixture.detectChanges();
    expect(switchRootElement.classList).toContain('disabled');
  });
  it('should be true on change', () => {
    switchNativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(rootComponent.formControl.value).toBeTrue();
  });
  it('should add checked class on value change', () => {
    rootComponent.formControl.setValue(true);
    fixture.detectChanges();
    expect(switchNativeElement.classList).toContain('checked');
  });
  it('switch should be invalid with formControl required', () => {
    rootComponent.formControl.setValidators(Validators.required);
    rootComponent.formControl.setValue(null);
    fixture.detectChanges();
    expect(switchElement).toHaveClass('ng-invalid');
  });
  it('switch should be invalid with required true', () => {
    rootComponent.required.set(true);
    fixture.detectChanges();
    expect(switchElement).toHaveClass('ng-invalid');
  });

  it("ng-content should be 'Test switch'", () => {
    expect(switchElement.textContent?.trim()).toBe('Test switch');
  });

  it('reverse should change label and toggle alignment', () => {
    rootComponent.reverse.set(true);
    fixture.detectChanges();
    expect(switchRootElement.classList).toContain('reverse');
  });
});

@Component({
  imports: [SwitchComponent, ReactiveFormsModule],
  template: `<app-switch
    [reverse]="reverse()"
    [required]="required"
    [formControl]="formControl"
  >
    Test switch
  </app-switch>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class SwitchTestComponent {
  reverse = signal(false);
  formControl = new FormControl();
  required = signal(false);
}
