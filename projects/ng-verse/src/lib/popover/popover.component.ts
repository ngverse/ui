import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ConnectedPosition,
  Overlay,
  OverlayRef,
  ScrollStrategy,
  STANDARD_DROPDOWN_BELOW_POSITIONS,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnInit,
  output,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PopoverTriggerDirective } from './popover-trigger.directive';

type POPOVER_POSITION = 'top' | 'right' | 'bottom' | 'left';
type SCROLL_BEHAVIOR = 'reposition' | 'block' | 'close' | 'none';
type TRIGGER_EVENT = 'click' | 'none';

export const overlayAnimation = trigger('overlayAnimation', [
  state('void', style({ opacity: 0, transform: 'scale(0.9)' })), // Initial state
  state('enter', style({ opacity: 1, transform: 'scale(1)' })), // Final state when open
  state('leave', style({ opacity: 0, transform: 'scale(0.9)' })), // Final state when closing
  transition('void => enter', [animate('150ms ease-out')]), // Enter animation
  transition('enter => leave', [animate('150ms ease-in')]), // Leave animation
]);
@Component({
  selector: 'app-popover',
  imports: [],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [overlayAnimation],
})
export class PopoverComponent implements OnInit {
  animationState = signal<'enter' | 'leave'>('enter');

  trigger = input.required<PopoverTriggerDirective>();
  sub = new Subscription();
  overlay = inject(Overlay);
  position = input<POPOVER_POSITION>('bottom');
  offsetX = input<number>(0);
  offsetY = input<number>(0);
  scrollBehavior = input<SCROLL_BEHAVIOR>('reposition');
  triggerEvent = input<TRIGGER_EVENT>('click');
  content = viewChild.required(TemplateRef);
  vf = inject(ViewContainerRef);
  hasBackdrop = input<boolean>(false);

  overlayRef: OverlayRef | undefined;

  closeOnEscape = input<boolean>(true);
  closeOnOutside = input<boolean>(true);
  opened = output();
  closed = output();

  isOpen = input<boolean | undefined>();

  constructor() {
    effect(() => {
      const isOpen = this.isOpen();
      if (isOpen) {
        this.show();
      } else {
        this.close();
      }
    });
  }

  ngOnInit(): void {
    const trigger = this.trigger();

    trigger.openTriggered.subscribe(() => {
      this.show();
    });
    trigger.closeTriggered.subscribe(() => {
      this.close();
    });
  }

  show() {
    if (this.overlayRef) {
      return;
    }
    const triggerEl = this.trigger().hostElement;
    const points = this.getOverlayPositionsByPosition();
    const scrollOption = this.getScrollOptionByScrollBehavior();
    const triggerEvent = this.triggerEvent();
    this.animationState.set('enter');

    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(triggerEl)
        .withPositions(points),
      hasBackdrop: this.hasBackdrop(),
      disposeOnNavigation: true,
      scrollStrategy: scrollOption,
    });
    const contentPortal = new TemplatePortal(this.content(), this.vf);
    this.overlayRef.attach(contentPortal);
    if (this.closeOnEscape()) {
      this.onKeydown();
    }
    if (this.closeOnOutside()) {
      this.onPointerEvents();
    }
    this.opened.emit();
  }

  onPointerEvents() {
    this.overlayRef?.outsidePointerEvents().subscribe((e) => {
      this.close();
    });
  }

  onKeydown() {
    this.overlayRef?.keydownEvents().subscribe((e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }
  onAnimationEvent($event: AnimationEvent) {
    if ($event.toState === 'leave') {
      this.overlayRef?.dispose();
      this.overlayRef = undefined;
      this.closed.emit();
    }
  }

  close() {
    this.animationState.set('leave');

    // this.overlayRef?.dispose();
    // this.closed.emit();
  }

  private getScrollOptionByScrollBehavior(): ScrollStrategy {
    switch (this.scrollBehavior()) {
      case 'reposition':
        return this.overlay.scrollStrategies.reposition();
      case 'block':
        return this.overlay.scrollStrategies.block();
      case 'close':
        return this.overlay.scrollStrategies.close();
      default:
        return this.overlay.scrollStrategies.noop();
    }
  }

  private getOverlayPositionsByPosition(): ConnectedPosition[] {
    switch (this.position()) {
      case 'top':
        return [
          {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
            offsetX: this.offsetX(),
            offsetY: this.offsetY(),
          },
        ];
      case 'right':
        return [
          {
            originX: 'end',
            originY: 'center',
            overlayX: 'start',
            overlayY: 'center',
            offsetX: this.offsetX(),
            offsetY: this.offsetY(),
          },
        ];
      case 'bottom':
        return STANDARD_DROPDOWN_BELOW_POSITIONS;
      case 'left':
        return [
          {
            originX: 'start',
            originY: 'center',
            overlayX: 'end',
            overlayY: 'center',
            offsetX: this.offsetX(),
            offsetY: this.offsetY(),
          },
        ];
    }
  }
}
