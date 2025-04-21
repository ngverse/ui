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
  let optionEl: HTMLElement;
  let option: OptionComponent<unknown>;

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
    optionEl = fixture.debugElement.query(By.css('app-option'))
      .nativeElement as HTMLElement;
    option = fixture.debugElement.query(
      By.directive(OptionComponent)
    ).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should disable option on disabled=[true]', async () => {
    component.disabled.set(true);
    await fixture.whenStable();
    expect(optionEl.getAttribute('aria-disabled')).toBeTruthy();
  });
  it('content should return the textContent', () => {
    expect(option.content).toBe('First Value');
  });
});

@Component({
  selector: 'app-test-option',
  imports: [SelectComponent, OptionComponent, FormsModule],
  providers: [SelectComponent],
  template: `
    <app-option [value]="1" [disabled]="disabled()">First Value</app-option>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class OptionTestComponent {
  disabled = signal(false);
}
