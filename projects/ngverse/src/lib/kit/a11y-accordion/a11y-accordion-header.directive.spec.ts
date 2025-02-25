import {
  ChangeDetectionStrategy,
  Component,
  input,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { A11yAccordionHeaderDirective } from './a11y-accordion-header.directive';

describe('AccordionHeaderDirective', () => {
  let fixture: ComponentFixture<A11yAccordionHeaderTestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [A11yAccordionHeaderTestComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });

    fixture = TestBed.createComponent(A11yAccordionHeaderTestComponent);
    await fixture.whenStable();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should add a11y-accordion-header class', () => {
    const panel = fixture.debugElement.query(
      By.directive(A11yAccordionHeaderDirective)
    );
    expect(panel.nativeElement.classList).toContain('a11y-accordion-header');
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
  template: `<div appA11yAccordionHeader [ariaLevel]="ariaLevel()"></div>`,
  imports: [A11yAccordionHeaderDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class A11yAccordionHeaderTestComponent {
  ariaLevel = input<string>();
}
