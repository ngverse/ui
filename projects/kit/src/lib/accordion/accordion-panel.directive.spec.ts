import {
  ChangeDetectionStrategy,
  Component,
  input,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { A11yAccordionPanelDirective } from './accordion-panel.directive';
import { A11yAccordionDirective } from './accordion.directive';

describe('AccordionPanelDirective', () => {
  let fixture: ComponentFixture<GnAccordionPanelTestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [GnAccordionPanelTestComponent, AccordionPanelTest2Component],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).createComponent(GnAccordionPanelTestComponent);

    fixture = TestBed.createComponent(GnAccordionPanelTestComponent);
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('id should match accordion panelId', async () => {
    const fixture = TestBed.createComponent(AccordionPanelTest2Component);
    const panel = fixture.debugElement.query(
      By.directive(A11yAccordionPanelDirective)
    );
    await fixture.whenStable();
    const accordion = fixture.debugElement
      .query(By.directive(A11yAccordionDirective))
      .injector.get(A11yAccordionDirective);
    expect(panel.nativeElement.id).toBe(accordion.panelId);
  });

  it('aria-labelledby should be accordion titleId', async () => {
    const panel = fixture.debugElement.query(
      By.directive(A11yAccordionPanelDirective)
    );
    await fixture.whenStable();
    const accordion = fixture.debugElement
      .query(By.directive(A11yAccordionDirective))
      .injector.get(A11yAccordionDirective);
    expect(panel.nativeElement.getAttribute('aria-labelledby')).toBe(
      accordion.titleId
    );
  });
});

@Component({
  template: `<div ktA11yAccordion>
    <div ktA11yAccordionPanel><div></div></div>
  </div>`,
  imports: [A11yAccordionPanelDirective, A11yAccordionDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnAccordionPanelTestComponent {
  id = input<string>();
}

@Component({
  template: `<div ktA11yAccordion>
    <div ktA11yAccordionPanel><div></div></div>
  </div>`,
  imports: [A11yAccordionPanelDirective, A11yAccordionDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionPanelTest2Component {}
