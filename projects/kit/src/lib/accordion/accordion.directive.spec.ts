import {
  ChangeDetectionStrategy,
  Component,
  input,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { A11yAccordionDirective } from './accordion.directive';

describe('AccordionDirective', () => {
  let fixture: ComponentFixture<AccordionTestComponent>;
  let accordionDir: A11yAccordionDirective;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AccordionTestComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).createComponent(AccordionTestComponent);

    fixture = TestBed.createComponent(AccordionTestComponent);
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
});

@Component({
  template: `<div ktA11yAccordion></div>`,
  imports: [A11yAccordionDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionTestComponent {
  id = input<string>();
}
