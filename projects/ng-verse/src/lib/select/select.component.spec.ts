import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { OptionComponent } from '../select/option.component';
import { SelectComponent } from './select.component';

const OPTIONS = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
];

@Component({
  selector: 'app-test-select',
  template: `
    <app-select placeholder="Select a country" [formControl]="formControl">
      @for (option of options; track $index) {
        <app-option [value]="option.code">{{ option.name }}</app-option>
      }
    </app-select>
  `,
  imports: [ReactiveFormsModule, OptionComponent, SelectComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestComponent {
  options = OPTIONS;

  formControl = new FormControl<string | null>(null);
}

@Component({
  selector: 'app-test-multi-select',
  template: `
    <app-select
      placeholder="Select countries"
      [multiple]="true"
      [formControl]="formControl"
    >
      @for (option of options; track $index) {
        <app-option [value]="option.code">{{ option.name }}</app-option>
      }
    </app-select>
  `,
  imports: [ReactiveFormsModule, OptionComponent, SelectComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestMultiselectComponent {
  options = OPTIONS;
  formControl = new FormControl<string[]>([]);
}

function openSelect(fixture: ComponentFixture<unknown>) {
  const selectButton = fixture.nativeElement.querySelector('.select-button');
  selectButton.click();
  fixture.detectChanges();
  fixture.nativeElement.querySelector('.select-options').dispatchEvent(
    new Event('transitionend', {
      bubbles: true,
      cancelable: false,
    })
  );
  fixture.detectChanges();
}

function closeSelect(fixture: ComponentFixture<unknown>) {
  const selectButton = fixture.nativeElement.querySelector('.select-button');
  selectButton.click();
  fixture.detectChanges();
}

function queryOptions(fixture: ComponentFixture<unknown>) {
  return fixture.nativeElement.querySelectorAll('.option');
}

function isSelectOpened(fixture: ComponentFixture<unknown>) {
  return fixture.nativeElement
    .querySelector('.select-options')
    .matches(':popover-open');
}

xdescribe('SelectComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, TestMultiselectComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show options when select button is clicked', () => {
    openSelect(fixture);
    expect(isSelectOpened(fixture)).toBe(true);
    expect(queryOptions(fixture).length).toBe(OPTIONS.length);
  });

  describe('Placeholder', () => {
    it('should display placeholder text when no value is selected', () => {
      const selectButtonLabel = fixture.nativeElement.querySelector(
        '.select-button-label'
      );
      expect(selectButtonLabel.textContent).toBe('Select a country');
    });

    it('should display selected value label', () => {
      component.formControl.setValue('US');
      fixture.detectChanges();
      const selectButtonLabel = fixture.nativeElement.querySelector(
        '.select-button-label'
      );
      expect(selectButtonLabel.textContent.trim()).toBe('United States');
    });

    it('should display select-button-icon', () => {
      const selectButtonIcon = fixture.nativeElement.querySelector(
        '.select-button-icon'
      );
      expect(selectButtonIcon).toBeTruthy();
    });
  });

  describe('Open/Close', () => {
    it('should close select after selecting an option', () => {
      openSelect(fixture);
      queryOptions(fixture)[0].click();
      fixture.detectChanges();
      expect(isSelectOpened(fixture)).toBe(false);
    });

    it('should close select when clicking on select button', () => {
      openSelect(fixture);
      expect(queryOptions(fixture).length).not.toBe(0);
      closeSelect(fixture);
      expect(isSelectOpened(fixture)).toBe(false);
    });
  });

  describe('Form Control', () => {
    it('should change formControlValue on select option enter', () => {
      openSelect(fixture);
      const selectIndex = 1;
      queryOptions(fixture)[selectIndex].click();
      expect(component.formControl.value).toEqual(OPTIONS[selectIndex].code);
    });

    it('should make control touched when select is closed', () => {
      openSelect(fixture);
      closeSelect(fixture);
      expect(component.formControl.touched).toBe(true);
      expect(fixture.nativeElement.querySelector('app-select')).toHaveClass(
        'ng-touched'
      );
    });

    it('should make control dirty when an option is selected', () => {
      openSelect(fixture);
      queryOptions(fixture)[1].click();
      fixture.detectChanges();
      expect(component.formControl.dirty).toBe(true);
      expect(component.formControl.pristine).toBe(false);
      const selectElement = fixture.nativeElement.querySelector('app-select');
      expect(selectElement).toHaveClass('ng-dirty');
    });

    it('required validation', () => {
      component.formControl.addValidators(Validators.required);
      fixture.detectChanges();
      component.formControl.setValue(null);
      fixture.detectChanges();
      const selectElement = fixture.nativeElement.querySelector('app-select');
      expect(selectElement).toHaveClass('ng-invalid');
      component.formControl.setValue('US');
      fixture.detectChanges();
      expect(selectElement).toHaveClass('ng-valid');
    });
  });

  describe('Selection', () => {
    it('should show checkmark if item is selected', () => {
      openSelect(fixture);
      const selectedOption = queryOptions(fixture)[1];
      selectedOption.click();
      fixture.detectChanges();
      const checkmark = selectedOption.querySelector('app-select-check-icon');
      expect(checkmark).toBeTruthy();
    });

    it('should not show checkmark if item is not selected', () => {
      openSelect(fixture);
      const selectedOption = queryOptions(fixture)[1];
      selectedOption.click();
      fixture.detectChanges();
      const checkmark = selectedOption.querySelector('app-select-check-icon');
      expect(checkmark).toBeTruthy();
    });
  });

  describe('Multiselect', () => {
    let component: TestMultiselectComponent;
    let fixture: ComponentFixture<TestMultiselectComponent>;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestMultiselectComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    describe('Placeholder', () => {
      it('should display selected values separated by comma when a value is selected', () => {
        component.formControl.setValue(['US', 'CA']);
        fixture.detectChanges();
        const selectButtonLabel = fixture.nativeElement.querySelector(
          '.select-button-label'
        );
        expect(selectButtonLabel.textContent.trim()).toBe(
          'United States, Canada'
        );
      });
    });

    describe('Open/Close', () => {
      it('should not close select when selecting an option', () => {
        openSelect(fixture);
        queryOptions(fixture)[0].click();
        fixture.detectChanges();
        expect(isSelectOpened(fixture)).toBe(true);
      });
    });
  });
});
