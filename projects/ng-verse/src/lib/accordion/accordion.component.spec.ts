import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AccordionBodyComponent } from './accordion-body.component';
import { AccordionHeaderComponent } from './accordion-header.component';
import { AccordionItemComponent } from './accordion-item.component';
import { AccordionComponent } from './accordion.component';

@Component({
  selector: 'app-host',
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
class HostComponent {
  multi = signal(false);
}

describe('AccordionComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
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
    fixture.detectChanges();
    expect(firstAccordion.isOpen()).toBeTrue();
    expect(secondAccordion.isOpen()).toBeFalse();
  });
  it('open accordion should not close another on multi=true', () => {
    fixture.componentInstance.multi.set(true);
    fixture.detectChanges();
    const accordionItems = fixture.debugElement.queryAll(
      By.directive(AccordionItemComponent)
    );
    const firstAccordion = accordionItems[0].componentInstance;
    const secondAccordion = accordionItems[1].componentInstance;
    firstAccordion.toggle();
    fixture.detectChanges();
    secondAccordion.toggle();
    fixture.detectChanges();
    expect(firstAccordion.isOpen()).toBeTrue();
    expect(secondAccordion.isOpen()).toBeTrue();
  });
});
