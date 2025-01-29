import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { OptionComponent } from './option.component';
import { SelectComponent } from './select.component';

describe('OptionComponent', () => {
  let component: OptionTestComponent;
  let fixture: ComponentFixture<OptionTestComponent>;
  let buttonEl: HTMLButtonElement;
  let option: OptionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionTestComponent],
      providers: [
        provideNoopAnimations(),
        provideExperimentalZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionTestComponent);
    component = fixture.componentInstance;
    buttonEl = fixture.debugElement.query(By.css('app-option button'))
      .nativeElement as HTMLButtonElement;
    option = fixture.debugElement.query(
      By.directive(OptionComponent)
    ).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should disable button on disabled=[true]', async () => {
    component.disabled.set(true);
    await fixture.whenStable();
    expect(buttonEl.disabled).toBeTrue();
  });
  it('content should return the textContent', () => {
    expect(option.content).toBe('First Value');
  });
});

@Component({
  selector: 'app-test-option',
  imports: [SelectComponent, OptionComponent, FormsModule],
  template: `
    <app-select placeholder="Test" [(ngModel)]="selectValue">
      <app-option [value]="1" [disabled]="disabled()">First Value</app-option>
    </app-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class OptionTestComponent {
  disabled = signal(false);
}
