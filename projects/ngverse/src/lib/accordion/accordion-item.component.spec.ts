import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { AccordionBodyComponent } from './accordion-body.component';
import { AccordionHeaderComponent } from './accordion-header.component';
import { AccordionItemComponent } from './accordion-item.component';
import { AccordionComponent } from './accordion.component';

describe('AccordionItemComponent', () => {
  let component: AccordionItemTestComponent;
  let fixture: ComponentFixture<AccordionItemTestComponent>;
  let rootNative: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideNoopAnimations(),
        provideExperimentalZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionItemTestComponent);
    component = fixture.componentInstance;
    rootNative = fixture.nativeElement;
    await fixture.whenStable();
  });

  function accordionHeader() {
    return rootNative.querySelector('#accordion1 button') as HTMLElement;
  }
  function accordionBody() {
    return rootNative.querySelector(
      '#accordion1 [role="region"]'
    ) as HTMLElement | null;
  }

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', async () => {
    component.label.set('test label');
    await fixture.whenStable();

    const label = accordionHeader();
    expect(label.textContent?.trim()).toContain('test label');
  });

  it('should show body on header click', async () => {
    expect(accordionBody()).toBeNull();

    const header = accordionHeader();
    header.dispatchEvent(new Event('click'));

    await fixture.whenStable();

    expect(accordionBody()).toBeTruthy();
  });
  it("should close accordion when it's open and header is clicked", async () => {
    const header = accordionHeader();
    header.dispatchEvent(new Event('click'));
    await fixture.whenStable();
    expect(accordionBody()).toBeTruthy();
    header.dispatchEvent(new Event('click'));
    await fixture.whenStable();
    expect(accordionBody()).toBeFalsy();
  });
  it('should disable the header button on disabled', async () => {
    component.disabled.set(true);
    await fixture.whenStable();
    expect(accordionHeader().hasAttribute('disabled')).toBeTrue();
  });

  it('should expand accordion with expanded=true', async () => {
    component.expanded.set(true);
    await fixture.whenStable();
    expect(accordionBody()).toBeTruthy();
  });

  it('should display content header', async () => {
    component.showContentLabel.set('Content Label');
    await fixture.whenStable();
    expect(accordionHeader().textContent?.trim()).toContain('Content Label');
  });
});

@Component({
  selector: 'app-accordion-item-test',
  imports: [
    AccordionComponent,
    AccordionItemComponent,
    AccordionHeaderComponent,
    AccordionBodyComponent,
  ],
  template: `
    <app-accordion>
      <app-accordion-item
        id="accordion1"
        [disabled]="disabled()"
        [label]="label()"
        [expanded]="expanded()"
        [ariaLevel]="ariaLevel()"
      >
        @if (showContentLabel()) {
          <app-accordion-header>Content Label</app-accordion-header>
        }
        <app-accordion-body>Body 1</app-accordion-body>
      </app-accordion-item>
    </app-accordion>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AccordionItemTestComponent {
  disabled = signal<boolean | undefined>(undefined);
  label = signal<string | undefined>(undefined);
  expanded = signal<boolean | undefined>(undefined);
  ariaLevel = signal<number>(6);
  showContentLabel = signal<string | undefined>(undefined);
}
