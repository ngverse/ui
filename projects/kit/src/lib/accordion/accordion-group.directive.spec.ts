import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { A11yAccordionGroupDirective } from './accordion-group.directive';

describe('GnAccordionGroupDirective', () => {
  let fixture: ComponentFixture<AccordionGroupTestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AccordionGroupTestComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).createComponent(AccordionGroupTestComponent);

    fixture = TestBed.createComponent(AccordionGroupTestComponent);
    await fixture.whenStable();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

@Component({
  template: `<div ktA11yAccordionGroup></div>`,
  imports: [A11yAccordionGroupDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionGroupTestComponent {}
