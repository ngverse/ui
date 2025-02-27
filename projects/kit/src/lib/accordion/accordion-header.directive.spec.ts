import {
  ChangeDetectionStrategy,
  Component,
  input,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { A11yAccordionHeaderDirective } from './accordion-header.directive';

describe('AccordionHeaderDirective', () => {
  let fixture: ComponentFixture<AccordionHeaderTestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AccordionHeaderTestComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });

    fixture = TestBed.createComponent(AccordionHeaderTestComponent);
    await fixture.whenStable();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should add role heading', () => {
    const panel = fixture.debugElement.query(
      By.directive(A11yAccordionHeaderDirective)
    );
    expect(panel.nativeElement.getAttribute('role')).toBe('heading');
  });
  it('should add aria-level', async () => {
    fixture.componentRef.setInput('ariaLevel', '1');
    await fixture.whenStable();
    const panel = fixture.debugElement.query(
      By.directive(A11yAccordionHeaderDirective)
    );
    expect(panel.nativeElement.getAttribute('aria-level')).toBe('1');
  });
});

@Component({
  template: `<div ktA11yAccordionHeader [a11yAriaLevel]="ariaLevel()"></div>`,
  imports: [A11yAccordionHeaderDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionHeaderTestComponent {
  ariaLevel = input<string>('3');
}
