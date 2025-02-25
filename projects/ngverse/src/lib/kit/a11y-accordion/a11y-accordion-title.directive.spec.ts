import {
  ChangeDetectionStrategy,
  Component,
  input,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { A11yAccordionTitleDirective } from './a11y-accordion-title.directive';
import { A11yAccordionDirective } from './a11y-accordion.directive';

describe('AccordionTitleDirective', () => {
  let fixture: ComponentFixture<GnAccordionTitleTestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [GnAccordionTitleTestComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });

    fixture = TestBed.createComponent(GnAccordionTitleTestComponent);
    await fixture.whenStable();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
  it('should add a11y-accordion-title class', () => {
    const title = fixture.debugElement.query(
      By.directive(A11yAccordionTitleDirective)
    );
    expect(title.nativeElement.classList).toContain('a11y-accordion-title');
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
    const fixture = TestBed.createComponent(GnAccordionTitleTestComponent);
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
    const fixture = TestBed.createComponent(GnAccordionTitleTestComponent);
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
    <div appA11yAccordion>
      <button appA11yAccordionTitle [isExpanded]="isExpanded()">
        I am content
      </button>
    </div>
  `,
  imports: [A11yAccordionTitleDirective, A11yAccordionDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnAccordionTitleTestComponent {
  isExpanded = input<boolean>(false);
}
