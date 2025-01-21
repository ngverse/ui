import {
  animate,
  AnimationEvent,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { DomPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  output,
  TemplateRef,
  untracked,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  asyncScheduler,
  filter,
  fromEvent,
  merge,
  observeOn,
  Subscription,
} from 'rxjs';
import { PopoverOriginDirective } from './popover-origin.directive';
export type POPOVER_POSITIONS = 'top' | 'right' | 'bottom' | 'left';
export interface POPOVER_COORDINATES {
  x: number;
  y: number;
}

@Component({
  selector: 'app-popover',
  imports: [],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggle', [
      transition('false => true', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('150ms', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition('true => false', [
        style({ opacity: 1, transform: 'scale(1)', display: 'block' }),
        animate('150ms', style({ opacity: 0, transform: 'scale(0)' })),
      ]),
    ]),
  ],
})
export class PopoverComponent implements OnDestroy {
  overlay = inject(Overlay);
  tempRef = contentChild.required(TemplateRef);
  vf = inject(ViewContainerRef);
  isOpen = model(false);
  hasBackdrop = input<boolean>(false);

  blockScroll = input<boolean>(false);

  outsideClose = input(false);

  stretchToOrigin = input(false);

  restoreFocus = input(false);

  styled = input(true);

  position = input<POPOVER_POSITIONS>('bottom');

  overlayPosition = computed(() => [
    {
      ...this.getOverlayPosition(this.position()),
      offsetX: this.offsetX(),
      offsetY: this.offsetY(),
    },
  ]);

  origin = input<PopoverOriginDirective>();
  popover = viewChild.required<ElementRef<HTMLElement>>('popover');

  coordinates = input<POPOVER_COORDINATES>();

  document = inject(DOCUMENT);

  offsetX = input<number>();
  offsetY = input<number>();

  opened = output();
  closed = output();

  overlayRef: OverlayRef | undefined;

  globalSub: Subscription | undefined;

  get isOpened() {
    return !!this.overlayRef;
  }

  constructor() {
    effect(() => {
      const isOpen = this.isOpen();
      if (isOpen) {
        this.show();
      } else {
        this.hide();
      }
    });

    effect(() => {
      const coordinates = this.coordinates();
      const overlayRef = this.overlayRef;
      if (overlayRef && coordinates) {
        const positionStrategy = overlayRef.getConfig()
          .positionStrategy as FlexibleConnectedPositionStrategy;
        positionStrategy.setOrigin(coordinates);
        overlayRef.updatePosition();
      }
    });
  }

  hide() {
    if (!this.isOpened) {
      return;
    }

    this.isOpen.set(false);
  }

  onDone(event: AnimationEvent) {
    if (
      event.fromState.toString() === 'true' &&
      event.toState.toString() === 'false'
    ) {
      this.dispose();
      return;
    }
    if (event.toState.toString() === 'true') {
      this.listenToGlobalEvents();
      this.opened.emit();
    }
  }

  show() {
    if (this.isOpened) {
      return;
    }

    untracked(() => {
      const scrollStrategy = this.blockScroll()
        ? this.overlay.scrollStrategies.block()
        : this.overlay.scrollStrategies.reposition();
      const origin = this.origin();
      const coordinates = this.coordinates();
      const connectingTo = origin ? origin.el : coordinates;

      if (!connectingTo) {
        throw new Error('origin or coordinates must be provided');
      }

      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .flexibleConnectedTo(connectingTo)
          .withPositions(this.overlayPosition())
          .withLockedPosition(true),
        hasBackdrop: this.hasBackdrop(),
        scrollStrategy: scrollStrategy,
      });
      this.overlayRef.attach(new DomPortal(this.popover()));
      this.tryStretch();
    });
  }

  private listenToGlobalEvents() {
    if (!this.isOpened) {
      return;
    }
    this.globalSub?.unsubscribe();
    this.globalSub = new Subscription();
    const overlayRef = this.overlayRef as OverlayRef;

    if (this.outsideClose()) {
      const outsideClick$ = overlayRef
        .outsidePointerEvents()
        .pipe(observeOn(asyncScheduler));
      const escapeEvent$ = overlayRef
        .keydownEvents()
        .pipe(filter((event) => event.key === 'Escape'));

      this.globalSub.add(
        merge(escapeEvent$, outsideClick$).subscribe(() => {
          this.hide();
        })
      );
    }

    this.globalSub.add(
      fromEvent(this.document, 'scroll', {
        capture: true,
        passive: true,
      }).subscribe((event) => {
        if (this.eventHappenedInsidePopover(event)) {
          return;
        }
        overlayRef.updatePosition();
      })
    );
  }

  private tryStretch() {
    untracked(() => {
      const origin = this.origin();
      if (this.stretchToOrigin() && origin) {
        this.popover().nativeElement.style.width = origin.el.offsetWidth + 'px';
      }
    });
  }

  dispose() {
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
    this.closed.emit();
    if (this.restoreFocus()) {
      this.origin()?.el.focus();
    }
  }

  private eventHappenedInsidePopover(event: Event) {
    const popoverEl = this.popover().nativeElement;
    const target = event.target as Node;
    if (target) {
      if (target === popoverEl || popoverEl.contains(target)) {
        return true;
      }
    }
    return false;
  }

  getOverlayPosition(position: POPOVER_POSITIONS): ConnectedPosition {
    switch (position) {
      case 'top':
        return {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
        };
      case 'right':
        return {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
        };
      case 'bottom':
        return {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
        };
      case 'left':
        return {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
        };
    }
  }

  ngOnDestroy(): void {
    this.globalSub?.unsubscribe();
  }
}
