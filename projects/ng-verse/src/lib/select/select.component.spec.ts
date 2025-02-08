import { OverlayContainer } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { OptionComponent } from './option.component';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let overlayContainer: OverlayContainer;

  async function openSelect(fixt?: ComponentFixture<unknown>) {
    const _fixture = fixt ?? fixture;
    const selectButton = _fixture.nativeElement.querySelector('.select-button');
    selectButton.dispatchEvent(new Event('click'));
    await _fixture.whenStable();
  }

  async function closeSelect() {
    const selectButton = fixture.nativeElement.querySelector(
      '.select-button'
    ) as HTMLElement;
    selectButton.dispatchEvent(new Event('click'));
    await fixture.whenStable();
  }

  function queryOptions() {
    return getOverlayContainerEl().querySelectorAll<HTMLElement>('app-option');
  }

  function isSelectOpened() {
    return !!getOverlayContainerEl().querySelector('.popover');
  }

  function getOverlayContainerEl() {
    return overlayContainer.getContainerElement();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, TestMultiselectComponent],
      providers: [
        provideNoopAnimations(),
        provideExperimentalZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    overlayContainer = TestBed.inject(OverlayContainer);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show options when select button is clicked', async () => {
    await openSelect();
    expect(isSelectOpened()).toBe(true);
    expect(queryOptions().length).toBe(OPTIONS.length);
  });

  describe('Placeholder', () => {
    it('should display placeholder text when no value is selected', async () => {
      await fixture.whenStable();
      const selectButtonLabel = fixture.nativeElement.querySelector(
        '.select-button-label'
      );
      expect(selectButtonLabel.textContent).toBe('Select a country');
    });

    it('should display selected value label', async () => {
      component.formControl.setValue('US');
      await fixture.whenStable();
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
    it('should close select after selecting an option', async () => {
      await openSelect();
      queryOptions()[0].dispatchEvent(new Event('click'));
      await fixture.whenStable();
      expect(isSelectOpened()).toBe(false);
    });

    it('should close select when clicking on select button', async () => {
      await openSelect();
      expect(queryOptions().length).not.toBe(0);
      await closeSelect();
      expect(isSelectOpened()).toBe(false);
    });
  });

  describe('Form Control', () => {
    it('should change formControlValue on select option enter', async () => {
      await openSelect();
      const selectIndex = 1;
      queryOptions()[selectIndex].dispatchEvent(new Event('click'));
      expect(component.formControl.value).toEqual(OPTIONS[selectIndex].code);
    });

    it('should make control touched when select is closed', async () => {
      await openSelect();
      await closeSelect();
      expect(component.formControl.touched).toBe(true);
      expect(fixture.nativeElement.querySelector('app-select')).toHaveClass(
        'ng-touched'
      );
    });

    it('should make control dirty when an option is selected', async () => {
      await openSelect();
      queryOptions()[1].dispatchEvent(new Event('click'));
      await fixture.whenStable();
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
    it('should show checkmark if item is selected', async () => {
      await openSelect();
      const selectedOption = queryOptions()[1];
      selectedOption.dispatchEvent(new Event('click'));
      await fixture.whenStable();
      const checkmark = selectedOption.querySelector('app-select-check-icon');
      expect(checkmark).toBeTruthy();
    });

    it('should not show checkmark if item is not selected', async () => {
      await openSelect();
      const selectedOption = queryOptions()[1];
      selectedOption.dispatchEvent(new Event('click'));
      await fixture.whenStable();
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
      await fixture.whenStable();
    });

    describe('Placeholder', () => {
      it('should display selected values separated by comma when a value is selected', async () => {
        component.formControl.setValue(['US', 'CA']);
        await fixture.whenStable();
        const selectButtonLabel = fixture.nativeElement.querySelector(
          '.select-button-label'
        );
        expect(selectButtonLabel.textContent.trim()).toBe(
          'United States, Canada'
        );
      });
    });

    describe('Open/Close', () => {
      it('should not close select when selecting an option', async () => {
        await openSelect(fixture);
        queryOptions()[0].dispatchEvent(new Event('click'));
        await fixture.whenStable();
        expect(isSelectOpened()).toBe(true);
      });
    });
  });
});
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
