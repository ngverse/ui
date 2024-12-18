import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { OptionComponent } from './option/option.component';
import { SelectComponent } from './select.component';
describe('SelectComponent', () => {
  let component: SelectTestComponent;
  let fixture: ComponentFixture<SelectTestComponent>;
  let htmlElement: HTMLElement;
  let selectButtonElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectTestComponent, SelectTestComplexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectTestComponent);
    component = fixture.componentInstance;
    htmlElement = fixture.nativeElement as HTMLElement;
    selectButtonElement = htmlElement.querySelector(
      '.select-button'
    ) as HTMLElement;
    fixture.detectChanges();
  });

  function selectOptionElement() {
    return document.querySelector('.select-options') as HTMLElement;
  }

  function optionIsActive(index: number) {
    const foundOption = document.querySelectorAll('app-option')[index]
      ?.firstChild as HTMLElement;
    expect(foundOption).toHaveClass('active');
  }

  function keyDownOnPanel(keyCode: number, key?: string) {
    const arrowDownEvent = new KeyboardEvent('keydown', {
      key: key,
      keyCode: keyCode,
    });
    selectOptionElement().dispatchEvent(arrowDownEvent);
    fixture.detectChanges();
  }

  function openPanel() {
    selectButtonElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label when no value is set', () => {
    component.formControl.reset();
    fixture.detectChanges();
    expect(selectButtonElement.textContent).toBe('Numbers');
  });

  it('displayed label should be two', () => {
    expect(selectButtonElement.textContent).toBe('two');
  });
  it('changed formControlValue to three should be applied', () => {
    component.formControl.setValue('three');
    fixture.detectChanges();
    expect(selectButtonElement.textContent).toBe('three');
  });
  it('click on select button should open the panel', () => {
    selectButtonElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(selectOptionElement()).toBeTruthy();
  });
  it('when no option is selected the first option should be active', () => {
    component.formControl.reset();
    fixture.detectChanges();
    openPanel();
    optionIsActive(0);
  });
  it('when value is set it should activate the selected option', () => {
    openPanel();
    optionIsActive(1);
  });
  it('should activate next option on arrow down', () => {
    openPanel();
    keyDownOnPanel(DOWN_ARROW);
    optionIsActive(2);
  });
  it('should activate prev option on arrow up', () => {
    openPanel();
    keyDownOnPanel(UP_ARROW);
    optionIsActive(0);
  });
  it('should select the option keydown enter', () => {
    openPanel();
    keyDownOnPanel(DOWN_ARROW);
    keyDownOnPanel(DOWN_ARROW);
    keyDownOnPanel(ENTER, 'Enter');
    expect(selectButtonElement.textContent).toBe('four');
  });
  it('should close the panel on enter', () => {
    openPanel();
    keyDownOnPanel(DOWN_ARROW);
    keyDownOnPanel(DOWN_ARROW);
    keyDownOnPanel(ENTER, 'Enter');
    expect(selectOptionElement()).toBeFalsy();
  });
  it('should change formControlValue on select option enter', () => {
    openPanel();
    keyDownOnPanel(DOWN_ARROW);
    keyDownOnPanel(ENTER, 'Enter');
    expect(component.formControl.value).toBe('three');
  });
  it('should change formControl value on select option click', () => {
    openPanel();
    const firstOptionButton = document.querySelector('app-option')
      ?.firstChild as HTMLElement;
    firstOptionButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.formControl.value).toBe('one');
  });
  it('compareWith should check against correct values', () => {
    const fixture = TestBed.createComponent(SelectTestComplexComponent);
    const fixtureElement = fixture.nativeElement as HTMLElement;
    const selectOption = fixtureElement.querySelector(
      '.select-button'
    ) as HTMLElement;
    fixture.detectChanges();
    expect(selectOption.textContent).toBe('John');
  });
});

@Component({
  selector: 'app-select-test',
  template: `
    <app-select
      [compareWith]="compareWith"
      [formControl]="formControl"
      label="Numbers"
    >
      @for (item of options; track $index) {
      <app-option [value]="item">{{ item }}</app-option>
      }
    </app-select>
  `,
  imports: [ReactiveFormsModule, SelectComponent, OptionComponent],
})
class SelectTestComponent {
  options = ['one', 'two', 'three', 'four', 'five'];

  formControl = new FormControl('two');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compareWith = (o1: any, o2: any) => o1 === o2;
}

@Component({
  selector: 'app-select-test-complex',
  template: `
    <app-select
      [compareWith]="compareWith"
      [formControl]="formControl"
      label="Users"
    >
      @for (item of options; track $index) {
      <app-option [value]="item">{{ item.name }}</app-option>
      }
    </app-select>
  `,
  imports: [ReactiveFormsModule, SelectComponent, OptionComponent],
})
class SelectTestComplexComponent {
  options = [
    {
      name: 'John',
      age: 28,
    },
    {
      name: 'Mike',
      age: 15,
    },
    {
      name: 'Alice',
      age: 35,
    },
  ];

  formControl = new FormControl({ ...this.options[0] });

  compareWith = (o1: { age: number }, o2: { age: number }) => o1.age === o2.age;
}
