import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
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
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionItemTestComponent);
    component = fixture.componentInstance;
    rootNative = fixture.nativeElement;
    fixture.detectChanges();
  });

  function accordionHeader() {
    return rootNative.querySelector(
      '#accordion1 .accordion-item-header'
    ) as HTMLElement;
  }
  function accordionBody() {
    return rootNative.querySelector(
      '#accordion1 .accordion-item-body'
    ) as HTMLElement | null;
  }

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    component.label.set('test label');
    fixture.detectChanges();
    const label = rootNative.querySelector(
      '.accordion-item-header'
    ) as HTMLElement;
    expect(label.textContent?.trim()).toBe('test label');
  });

  it('should show body on header click', () => {
    expect(accordionBody()).toBeNull();

    const header = accordionHeader();
    header.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(accordionBody()).toBeDefined();
  });
  it("should close accordion when it's open and header is clicked", () => {
    const header = accordionHeader();
    header.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(accordionBody()).toBeDefined();
    header.dispatchEvent(new Event('click'));
    fixture.detectChanges();
  });
  it('should disable the header button on disabled', () => {
    component.disabled.set(true);
    fixture.detectChanges();
    expect(accordionHeader().hasAttribute('disabled')).toBeTrue();
  });

  it('should expand accordion with expanded=true', () => {
    component.expanded.set(true);
    fixture.detectChanges();
    expect(accordionBody()).toBeDefined();
  });
  it('should set aria-level correctly', () => {
    const roleHeading = rootNative.querySelector(
      '[role=heading]'
    ) as HTMLElement;
    expect(roleHeading).toBeDefined();
    expect(roleHeading.getAttribute('aria-level')).toBe('6');
  });
  it('should display content header', () => {
    component.showContentLabel.set('Content Label');
    fixture.detectChanges();
    expect(accordionHeader().textContent?.trim()).toBe('Content Label');
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
