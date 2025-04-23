import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartSelectorComponent } from './part-selector.component';
import { By } from '@angular/platform-browser';
import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';

@Component({
  selector: 'app-part-selector-test',
  template: `
    <app-part-selector
      [value]="value"
      (valueChange)="onValueChange($event)"
    ></app-part-selector>
  `,
  imports: [PartSelectorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PartSelectorTestComponent {
  value = 10;
  onValueChange(newValue: number) {
    this.value = newValue;
  }
}

describe('PartSelectorComponent', () => {
  let fixture: ComponentFixture<PartSelectorTestComponent>;
  let hostComponent: PartSelectorTestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartSelectorTestComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartSelectorTestComponent);
    hostComponent = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the main test host component', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should display the initial value', () => {
    const valueDisplayElement = fixture.debugElement.query(
      By.css('.current-value')
    ).nativeElement;
    expect(valueDisplayElement.textContent.trim()).toBe('10');
  });

  it('should emit valueChange and update value when increment button is clicked', () => {
    const incrementButton = fixture.debugElement.query(
      By.css('.increment-button')
    ).nativeElement;

    incrementButton.click();
    fixture.detectChanges();

    expect(hostComponent.value).toBe(11);
  });

  it('should emit valueChange and update value when decrement button is clicked', () => {
    const decrementButton = fixture.debugElement.query(
      By.css('.decrement-button')
    ).nativeElement;

    decrementButton.click();
    fixture.detectChanges();

    expect(hostComponent.value).toBe(9);
  });
});
