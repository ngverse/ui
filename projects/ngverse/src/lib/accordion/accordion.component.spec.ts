import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AccordionBodyComponent } from './accordion-body.component';
import { AccordionHeaderComponent } from './accordion-header.component';
import { AccordionItemComponent } from './accordion-item.component';
import { AccordionComponent } from './accordion.component';

describe('AccordionComponent', () => {
  let fixture: ComponentFixture<AccordionTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideNoopAnimations(),
        provideExperimentalZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionTestComponent);
    await fixture.whenStable();
  });

  it('should render multiple accordion items', () => {
    const accordionItems = fixture.debugElement.queryAll(
      By.directive(AccordionItemComponent)
    );
    expect(accordionItems.length).toBe(2);
  });

  it('open one accordion should close another one on multi=false', () => {
    const accordionItems = fixture.debugElement.queryAll(
      By.directive(AccordionItemComponent)
    );
    const firstAccordion = accordionItems[0].componentInstance;
    const secondAccordion = accordionItems[1].componentInstance;
    firstAccordion.toggle();
    expect(firstAccordion.expanded).toBeTrue();
    expect(secondAccordion.expanded).toBeFalse();
  });
  it('open accordion should not close another on multi=true', async () => {
    fixture.componentInstance.multi.set(true);
    const accordionItems = fixture.debugElement.queryAll(
      By.directive(AccordionItemComponent)
    );
    const firstAccordion = accordionItems[0].componentInstance;
    const secondAccordion = accordionItems[1].componentInstance;
    firstAccordion.toggle();
    await fixture.whenStable();
    secondAccordion.toggle();
    expect(firstAccordion.expanded).toBeTrue();
    expect(secondAccordion.expanded).toBeTrue();
  });
});
@Component({
  selector: 'app-accordion-test',
  imports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionHeaderComponent,
    AccordionBodyComponent,
  ],
  template: `
    <app-accordion [multi]="multi()">
      <app-accordion-item>
        <app-accordion-header>Header 1</app-accordion-header>
        <app-accordion-body>Body 1</app-accordion-body>
      </app-accordion-item>
      <app-accordion-item>
        <app-accordion-header>Header 2</app-accordion-header>
        <app-accordion-body>Body 2</app-accordion-body>
      </app-accordion-item>
    </app-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AccordionTestComponent {
  multi = signal(false);
}
