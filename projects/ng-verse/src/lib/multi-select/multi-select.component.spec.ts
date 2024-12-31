import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiSelectComponent } from './multi-select.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { MultiSelectItemComponent } from '@ng-verse/multi-select/multi-select-item/multi-select-item.component';
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';

describe('MultiSelectComponent', () => {
  let component: MultiSelectTestComponent;
  let fixture: ComponentFixture<MultiSelectTestComponent>;
  let selectButtonElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiSelectTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    selectButtonElement = fixture.nativeElement.querySelector('.select-button');
  });

  function openPanel() {
    selectButtonElement.click();
    fixture.detectChanges();
  }

  function selectOptionElement() {
    return document.querySelector('.select-options') as HTMLElement;
  }

  function optionIsSelected(index: number) {
    const foundOption = document.querySelectorAll('app-multi-select-item')[index]as HTMLElement;
    expect(foundOption).toHaveClass('selected');
  }

  function optionIsFocused(index: number) {
    const foundOption = document.querySelectorAll('app-multi-select-item')[index] as HTMLElement;
    expect(foundOption).toHaveClass('focused');
  }

  function keyDownOnPanel(keyCode: number, key?: string) {
    const arrowDownEvent = new KeyboardEvent('keydown', {
      key: key,
      keyCode: keyCode,
    });
    fixture.nativeElement.querySelector('app-multi-select').dispatchEvent(arrowDownEvent);
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label when no value is set', () => {
    component.formControl.reset();
    fixture.detectChanges();
    expect(selectButtonElement.textContent?.trim()).toBe('Numbers');
  });

  it('should display selected values separated by comma', () => {
    component.formControl.setValue(['one', 'two']);
    fixture.detectChanges();
    expect(selectButtonElement.textContent?.trim()).toBe('one, two');
  });

  describe('Open/Close state', () => {
    it('should be closed by default', () => {
      expect(selectOptionElement()).toBeFalsy();
    });

    it('should open dropdown', () => {
      openPanel();
      expect(selectOptionElement()).toBeTruthy();
    });

    it('should close the dropdown', () => {
      openPanel();
      document.querySelector('.cdk-backdrop-transparent')?.dispatchEvent(new Event('click')); // close()
      fixture.detectChanges();
      expect(selectOptionElement()).toBeFalsy();
    });

    it('should focus first option when opened', () => {
      openPanel();
      optionIsFocused(0);
    });
  });

  describe('ControlValueAccessor', () => {
    function testEmptyValue(initialValue: unknown[] | unknown | null | undefined) {
      component.formControl.setValue(initialValue);
      fixture.detectChanges();
      openPanel();
      expect(document.querySelectorAll('app-multi-select-item.selected').length).toBe(0);
    }

    function testValue(initialValue: string[]) {
      component.formControl.setValue(initialValue);
      fixture.detectChanges();
      openPanel();
      const selectedOptions = document.querySelectorAll('app-multi-select-item.selected');
      const textChildrenIndex = 1; // 0 is the svg icon
      for(let i = 0; i < initialValue.length; i++) {
        expect(selectedOptions[i].children[textChildrenIndex].textContent).toBe(initialValue[i]);
      }
    }

    it('should change formControl/ngModel value when option is selected', () => {
      openPanel();
      const optionTwo = document.querySelectorAll('app-multi-select-item')[1] as HTMLElement;
      optionTwo.click();
      fixture.detectChanges();
      expect(component.formControl.value).toEqual(['two']);
    });

    it('should not have selected options when formControl is null', () => {
      testEmptyValue(null);
    });

    it('should not have selected options when formControl is []', () => {
      testEmptyValue([]);
    });

    it('should not have selected options when formControl is undefined', () => {
      testEmptyValue(undefined);
    });

    it('should not have selected options when formControl is not an array', () => {
      testEmptyValue('not an array');
    });

    it('should select options based on initial value', () => {
      testValue(['two', 'three']);
    });

  })

  describe('Keyboard navigation', () => {
    it('should select focused element on Enter key', () => {
      openPanel();
      keyDownOnPanel(DOWN_ARROW);
      optionIsFocused(1);
      keyDownOnPanel(ENTER, 'Enter');
      optionIsSelected(1);
    });

    it('should handle keyboard navigation', () => {
      openPanel();
      keyDownOnPanel(DOWN_ARROW);
      optionIsFocused(1);

      keyDownOnPanel(DOWN_ARROW);
      optionIsFocused(2);

      keyDownOnPanel(UP_ARROW);
      optionIsFocused(1);
    });
  });
});


@Component({
  selector: 'app-multiselect-test',
  template: `
    <app-multi-select
      [formControl]="formControl"
      label="Numbers"
    >
      @for (item of options; track $index) {
        <app-multi-select-item [value]="item">{{ item }}</app-multi-select-item>
      }
    </app-multi-select>
  `,
  imports: [ReactiveFormsModule, MultiSelectItemComponent, MultiSelectComponent],
})
class MultiSelectTestComponent {
  options = ['one', 'two', 'three', 'four', 'five'];

  formControl = new FormControl<unknown[] | unknown | null | undefined>([]);
}
