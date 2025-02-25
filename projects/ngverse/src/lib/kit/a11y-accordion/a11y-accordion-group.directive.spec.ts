import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { A11yAccordionGroupDirective } from './a11y-accordion-group.directive';

describe('GnAccordionGroupDirective', () => {
  let fixture: ComponentFixture<A11yAccordionGroupTestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [A11yAccordionGroupTestComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).createComponent(A11yAccordionGroupTestComponent);

    fixture = TestBed.createComponent(A11yAccordionGroupTestComponent);
    await fixture.whenStable();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
  it('should add a11y-accordion-group class', () => {
    const panel = fixture.debugElement.query(
      By.directive(A11yAccordionGroupDirective)
    );
    expect(panel.nativeElement.classList).toContain('a11y-accordion-group');
  });
});

@Component({
  template: `<div appA11yAccordionGroup></div>`,
  imports: [A11yAccordionGroupDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class A11yAccordionGroupTestComponent {}
