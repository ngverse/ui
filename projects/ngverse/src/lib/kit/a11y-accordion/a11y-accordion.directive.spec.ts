import {
  ChangeDetectionStrategy,
  Component,
  input,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { A11yAccordionDirective } from './a11y-accordion.directive';

describe('AccordionDirective', () => {
  let fixture: ComponentFixture<GnAccordionTestComponent>;
  let accordionDir: A11yAccordionDirective;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [GnAccordionTestComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).createComponent(GnAccordionTestComponent);

    fixture = TestBed.createComponent(GnAccordionTestComponent);
    await fixture.whenStable();
    accordionDir = fixture.debugElement
      .query(By.directive(A11yAccordionDirective))
      .injector.get(A11yAccordionDirective);
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
  it('panelId should be set by default', () => {
    expect(accordionDir).toBeTruthy();
  });
  it('should add a11y-accordion class', () => {
    const panel = fixture.debugElement.query(
      By.directive(A11yAccordionDirective)
    );
    expect(panel.nativeElement.classList).toContain('a11y-accordion');
  });
});

@Component({
  template: `<div appA11yAccordion></div>`,
  imports: [A11yAccordionDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnAccordionTestComponent {
  id = input<string>();
}
