import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  provideExperimentalZonelessChangeDetection,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { TOOLTIP_EVENT, TooltipDirective } from './tooltip.directive';

describe('TooltipContainerComponent', () => {
  let component: TooltipTestComponent;
  let fixture: ComponentFixture<TooltipTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipTestComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipTestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display tooltip on hover', async () => {
    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    button.dispatchEvent(new Event('mouseenter'));
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    await fixture.whenStable();
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip?.textContent?.trim()).toBe('message');
  });
  it('should display tooltip on focus', async () => {
    component.tooltipEvent.set('focus');
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    button.dispatchEvent(new Event('focus'));
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    await fixture.whenStable();
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip?.textContent?.trim()).toBe('message');
  });
  it("should not display tooltip if tooltipEvent is 'hover' and it's focused", async () => {
    component.tooltipEvent.set('hover');
    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    button.dispatchEvent(new Event('focus'));
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    await fixture.whenStable();
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip).toBeNull();
  });
  it("should not display tooltip if tooltipEvent is 'focus' and it's hovered", async () => {
    component.tooltipEvent.set('focus');
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    button.dispatchEvent(new Event('mouseenter'));
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    await fixture.whenStable();
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip).toBeNull();
  });
  it('should display tooltip after tooltipDelay', async () => {
    component.tooltipDelay.set(100);
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    button.dispatchEvent(new Event('mouseenter'));

    await new Promise<void>((resolve) => setTimeout(resolve, 30));
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip).toBeFalsy();
    await new Promise<void>((resolve) => setTimeout(resolve, 100));
    await fixture.whenStable();
    expect(document.querySelector('.tooltip')).toBeTruthy(); // Tooltip should exist
  });

  it('should display only 1 tooltip even if mouseenter happens twice', async () => {
    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    button.dispatchEvent(new Event('mouseenter'));
    button.dispatchEvent(new Event('mouseenter'));
    await fixture.whenStable();
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    const tooltips = document.querySelectorAll('.tooltip');
    expect(tooltips.length).toBe(1);
  });

  it("should display custom content if it's provided", async () => {
    component.showCustom.set(true);
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    button.dispatchEvent(new Event('mouseenter'));
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    await fixture.whenStable();
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip?.textContent?.trim()).toBe('Custom content');
  });
  it('tooltip should close on escape', async () => {
    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    button.dispatchEvent(new Event('mouseenter'));
    await new Promise<void>((resolve) => setTimeout(resolve, 0));
    await fixture.whenStable();
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip?.textContent?.trim()).toBe('message');
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);
    await fixture.whenStable();
    expect(document.querySelector('.tooltip')).toBeFalsy();
  });
});

@Component({
  imports: [TooltipDirective],
  template: `
    <button
      [tooltipEvent]="tooltipEvent()"
      [tooltipDelay]="tooltipDelay()"
      [tooltipContent]="customContent()"
      [appTooltip]="'message'"
    >
      Hover me
    </button>
    <ng-template #temp>
      <div>Custom content</div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TooltipTestComponent {
  tooltipEvent = signal<TOOLTIP_EVENT>('hover');
  tooltipDelay = signal(0);
  template = viewChild<TemplateRef<unknown>>(TemplateRef);
  showCustom = signal(false);
  customContent = computed(() =>
    this.showCustom() ? this.template() : undefined
  );
}
