import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display tooltip on hover', fakeAsync(() => {
    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    button.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    tick(0);
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip?.textContent?.trim()).toBe('message');
  }));
  it('should display tooltip on focus', fakeAsync(() => {
    component.tooltipEvent.set('focus');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    button.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    tick(0);
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip?.textContent?.trim()).toBe('message');
  }));
  it("should not display tooltip if tooltipEvent is 'hover' and it's focused", fakeAsync(() => {
    component.tooltipEvent.set('hover');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    button.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    tick(0);
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip).toBeNull();
  }));
  it("should not display tooltip if tooltipEvent is 'focus' and it's hovered", fakeAsync(() => {
    component.tooltipEvent.set('focus');
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    button.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    tick(0);
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip).toBeNull();
  }));
  it('should display tooltip after tooltipDelay', fakeAsync(() => {
    component.tooltipDelay.set(500);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    button.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    tick(400);
    fixture.detectChanges();
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip).toBeFalsy();

    tick(100);
    fixture.detectChanges();
    expect(document.querySelector('.tooltip')).toBeTruthy(); // Tooltip should exist
  }));

  it('should display only 1 tooltip even if mouseenter happens twice', fakeAsync(() => {
    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    button.dispatchEvent(new Event('mouseenter'));
    button.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    tick(0);
    const tooltips = document.querySelectorAll('.tooltip');
    expect(tooltips.length).toBe(1);
  }));

  it("should display custom content if it's provided", fakeAsync(() => {
    component.showCustom.set(true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    button.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    tick(0);
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip?.textContent?.trim()).toBe('Custom content');
  }));
  it('tooltip should close on escape', fakeAsync(() => {
    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    button.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    tick(0);
    const tooltip = document.querySelector('.tooltip');
    expect(tooltip?.textContent?.trim()).toBe('message');
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);
    fixture.detectChanges();
    tick(0);
    expect(document.querySelector('.tooltip')).toBeFalsy();
  }));
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
