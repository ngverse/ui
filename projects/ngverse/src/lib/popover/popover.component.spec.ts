import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  model,
  provideExperimentalZonelessChangeDetection,
  signal,
  viewChild,
} from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { PopoverOriginDirective } from './popover-origin.directive';
import { PopoverComponent } from './popover.component';

describe('PopoverComponent', () => {
  let component: PopoverTestComponent;
  let fixture: ComponentFixture<PopoverTestComponent>;
  let overlayContainer: OverlayContainer;
  let document: Document;

  function getOverlayContainerEl() {
    return overlayContainer.getContainerElement();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverTestComponent, PopoverComponent],
      providers: [
        provideNoopAnimations(),
        provideExperimentalZonelessChangeDetection(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PopoverTestComponent);
    component = fixture.componentInstance;
    overlayContainer = TestBed.inject(OverlayContainer);
    document = TestBed.inject(DOCUMENT);
  });

  it('should create with origin', () => {
    expect(component.popover).toBeTruthy();
  });
  it('should open popover on IsOpen=true', async () => {
    component.isOpen.set(true);
    await fixture.whenStable();
    const overlayPopover = getOverlayContainerEl().querySelector(
      '.popover'
    ) as HTMLElement;
    expect(overlayPopover).toBeTruthy();
    expect(overlayPopover.textContent).toBe('I am First Popover content');
  });
  it('should close popover on IsOpen=false', async () => {
    component.isOpen.set(true);
    await fixture.whenStable();
    component.isOpen.set(false);
    await fixture.whenStable();
    const overlayPopover = getOverlayContainerEl().querySelector(
      '.popover'
    ) as HTMLElement;
    expect(overlayPopover).toBeNull();
  });
  it('should update isOpen value, on outside close of popover', async () => {
    component.outsideClose.set(true);
    component.isOpen.set(true);
    await fixture.whenStable();
    fixture.nativeElement.dispatchEvent(new Event('click'));
    //Click subscribtion has asyncscheduler so we have to wait for next tick
    await new Promise<void>((resolve) => setTimeout(resolve, 1));
    await fixture.whenStable();
    expect(component.isOpen()).toBeFalse();
  });
  it('should close popover on outside click if outsideClose is true', async () => {
    component.isOpen.set(true);
    component.outsideClose.set(true);
    await fixture.whenStable();
    fixture.nativeElement.dispatchEvent(new Event('click'));
    //Click subscribtion has asyncscheduler so we have to wait for next tick
    await new Promise<void>((resolve) => setTimeout(resolve, 1));
    await fixture.whenStable();
    const overlayPopover = getOverlayContainerEl().querySelector(
      '.popover'
    ) as HTMLElement;
    expect(overlayPopover).toBeNull();
  });
  it('should close popover on escape click if outsideClose is true', async () => {
    component.isOpen.set(true);
    component.outsideClose.set(true);
    await fixture.whenStable();
    document.body.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape' })
    );
    await fixture.whenStable();
    const overlayPopover = getOverlayContainerEl().querySelector(
      '.popover'
    ) as HTMLElement;
    expect(overlayPopover).toBeNull();
  });
  it('should not close popover on outside click if outsideClose is false', async () => {
    component.isOpen.set(true);
    component.outsideClose.set(false);
    fixture.nativeElement.dispatchEvent(new Event('click'));
    await fixture.whenStable();
    const overlayPopover = getOverlayContainerEl().querySelector(
      '.popover'
    ) as HTMLElement;
    expect(overlayPopover).toBeTruthy();
  });
  it('should add style class when styled=true', async () => {
    component.isOpen.set(true);
    component.styled.set(true);
    await fixture.whenStable();
    const overlayPopover = getOverlayContainerEl().querySelector(
      '.popover'
    ) as HTMLElement;
    expect(overlayPopover).toHaveClass('styled');
  });
  it('should add backdrop when hasBackdrop=true', async () => {
    component.isOpen.set(true);
    component.hasBackdrop.set(true);
    await fixture.whenStable();
    const overlayBackdrop = getOverlayContainerEl().querySelector(
      '.cdk-overlay-backdrop'
    ) as HTMLElement;
    expect(overlayBackdrop).toBeTruthy();
  });
  it("should emit 'close' event", async () => {
    const spy = jasmine.createSpy('closedSpty');
    component.isOpen.set(true);
    await fixture.whenStable();
    component.popover().closed.subscribe(spy);
    component.isOpen.set(false);
    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
  });
  it("should emit 'opened' event", async () => {
    const spy = jasmine.createSpy('openedSpy');
    component.popover().opened.subscribe(spy);
    component.isOpen.set(true);
    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
  });
  it('should restore focus on restoreFocus=true', async () => {
    component.isOpen.set(true);
    component.restoreFocus.set(true);
    await fixture.whenStable();
    component.isOpen.set(false);
    await fixture.whenStable();
    expect(document.activeElement).toBe(
      fixture.nativeElement.querySelector('.popover-button')
    );
  });
  it('should stretch to origin if stretchToOrigin=true', async () => {
    component.isOpen.set(true);
    component.stretchToOrigin.set(true);
    await fixture.whenStable();
    const overlayPopover = getOverlayContainerEl().querySelector(
      '.popover'
    ) as HTMLElement;
    const buttonElement = fixture.nativeElement.querySelector(
      '.popover-button'
    ) as HTMLElement;

    const tolerance = 5;

    expect(
      Math.abs(overlayPopover.clientWidth - buttonElement.clientWidth)
    ).toBeLessThanOrEqual(tolerance);
  });
});

@Component({
  template: `
    <button appPopoverOrigin #origin1="appPopoverOrigin" class="popover-button">
      Popover 1 origin
    </button>
    <app-popover
      #popover1
      [origin]="origin1"
      [(isOpen)]="isOpen"
      id="popover1"
      [outsideClose]="outsideClose()"
      [blockScroll]="blockScroll()"
      [styled]="styled()"
      [hasBackdrop]="hasBackdrop()"
      [restoreFocus]="restoreFocus()"
      [stretchToOrigin]="stretchToOrigin()"
    >
      <ng-template>
        <h1>I am First Popover content</h1>
      </ng-template>
    </app-popover>
  `,
  imports: [PopoverComponent, PopoverOriginDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PopoverTestComponent {
  popover = viewChild.required<PopoverComponent>('popover1');
  isOpen = model(false);
  outsideClose = signal(false);
  blockScroll = signal(false);
  styled = signal(false);
  hasBackdrop = signal(false);
  restoreFocus = signal(false);
  stretchToOrigin = signal(false);
}
