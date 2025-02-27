import {
  ChangeDetectionStrategy,
  Component,
  input,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { A11yAccordionTitleDirective } from './accordion-title.directive';
import { A11yAccordionDirective } from './accordion.directive';

describe('AccordionTitleDirective', () => {
  let fixture: ComponentFixture<AccordionTitleTestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AccordionTitleTestComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });

    fixture = TestBed.createComponent(AccordionTitleTestComponent);
    await fixture.whenStable();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should update aria-expanded', async () => {
    const title = fixture.debugElement.query(
      By.directive(A11yAccordionTitleDirective)
    );
    await fixture.whenStable();
    expect(title.nativeElement.getAttribute('aria-expanded')).toBe('false');
    fixture.componentRef.setInput('isExpanded', true);
    await fixture.whenStable();
    expect(title.nativeElement.getAttribute('aria-expanded')).toBe('true');
  });

  it('title id should match accordion titleId', async () => {
    const fixture = TestBed.createComponent(AccordionTitleTestComponent);
    const title = fixture.debugElement.query(
      By.directive(A11yAccordionTitleDirective)
    );
    await fixture.whenStable();
    const accordion = fixture.debugElement
      .query(By.directive(A11yAccordionDirective))
      .injector.get(A11yAccordionDirective);
    expect(title.nativeElement.id).toBe(accordion.titleId);
  });
  it('aria-controls should match accordion panelId', async () => {
    const fixture = TestBed.createComponent(AccordionTitleTestComponent);
    const title = fixture.debugElement.query(
      By.directive(A11yAccordionTitleDirective)
    );
    await fixture.whenStable();
    const accordion = fixture.debugElement
      .query(By.directive(A11yAccordionDirective))
      .injector.get(A11yAccordionDirective);
    expect(title.nativeElement.getAttribute('aria-controls')).toBe(
      accordion.panelId
    );
  });
});

@Component({
  template: `
    <div ktA11yAccordion>
      <button ktA11yAccordionTitle [a11yIsExpanded]="isExpanded()">
        I am content
      </button>
    </div>
  `,
  imports: [A11yAccordionTitleDirective, A11yAccordionDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionTitleTestComponent {
  isExpanded = input<boolean>(false);
}
