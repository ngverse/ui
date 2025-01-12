import { Overlay } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  HostBinding,
  inject,
  input,
  model,
  OnDestroy,
  output,
  Renderer2,
  signal,
} from '@angular/core';
import {
  asyncScheduler,
  filter,
  fromEvent,
  observeOn,
  Subscription,
  take,
  throttleTime,
} from 'rxjs';
import { PopoverOriginDirective } from './popover-origin.directive';
import { POPOVER_ANIMATIONS } from './popover.animations';

interface TRIGGER_COORDINATES {
  x: number;
  y: number;
}

type POPOVER_POSITION_Y = 'bottom';

@Component({
  selector: 'app-popover',
  imports: [],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [POPOVER_ANIMATIONS],
})
export class PopoverComponent implements OnDestroy {
  popover = inject(ElementRef<HTMLElement>);
  popoverEl = this.popover.nativeElement as HTMLElement;
  private renderer2 = inject(Renderer2);
  private document = inject(DOCUMENT);

  @HostBinding('attr.popover')
  bind = 'manual';

  origin = input<PopoverOriginDirective>();
  isOpen = model(false);
  offsetY = input<number>(0);
  offsetX = input<number>(0);
  blockScroll = input(true);
  positionY = input<POPOVER_POSITION_Y>('bottom');

  scrollBlocker = inject(Overlay).scrollStrategies.block();

  stretchToOrigin = input(true);

  opened = output();
  closed = output();

  documenSub: Subscription | undefined;

  coordinates = signal<TRIGGER_COORDINATES | undefined>(undefined);

  get popoverIsOpen() {
    return this.popoverEl.matches(':popover-open');
  }

  constructor() {
    effect(() => {
      const isOpen = this.isOpen();
      if (isOpen) {
        this._open();
      } else {
        this._hide();
      }
    });
  }

  open(coordinates?: TRIGGER_COORDINATES) {
    this.coordinates.set(coordinates);
  }

  private _open() {
    if (this.popoverIsOpen) {
      return;
    }
    const popover = this.popover.nativeElement;
    popover.showPopover();
    //wait till the animation ends
    fromEvent(popover, 'transitionend')
      .pipe(throttleTime(1), take(1))
      .subscribe(() => {
        this.opened.emit();
      });
    this.updateCoordinates();
    if (this.blockScroll()) {
      this.scrollBlocker.enable();
    }
    this.listenToDocument();
  }

  private _hide() {
    if (this.popoverIsOpen) {
      const popover = this.popover.nativeElement;
      popover.hidePopover();
      this.closed.emit();
      if (this.blockScroll()) {
        this.scrollBlocker.disable();
      }
      this.documenSub?.unsubscribe();
    }
  }

  private eventHappenedInsidePopover(event: Event) {
    const target = event.target as Node;
    if (target) {
      if (target === this.popoverEl || this.popoverEl.contains(target)) {
        return true;
      }
    }
    return false;
  }

  listenToDocument() {
    this.documenSub?.unsubscribe();
    this.documenSub = fromEvent(this.document, 'scroll', {
      capture: true,
      passive: true,
    }).subscribe((event) => {
      if (this.eventHappenedInsidePopover(event)) {
        return;
      }
      this.updateCoordinates();
    });

    this.documenSub!.add(
      fromEvent(this.document, 'click')
        .pipe(observeOn(asyncScheduler))
        .pipe(filter((event) => !this.eventHappenedInsidePopover(event)))
        .subscribe(() => {
          this.isOpen.set(false);
        })
    );

    this.documenSub.add(
      fromEvent<KeyboardEvent>(this.document, 'keydown')
        .pipe(filter((event) => event.key === 'Escape'))
        .subscribe(() => {
          this.isOpen.set(false);
        })
    );
  }

  getTriggerBounds(): DOMRect | undefined {
    const trigger = this.origin();
    if (!trigger) {
      return;
    }
    const triggerEl = trigger.el;
    const bounds = triggerEl.getBoundingClientRect();
    return bounds;
  }

  updateCoordinates() {
    const triggerBounrds = this.getTriggerBounds();

    const popoverEl = this.popoverEl;

    const offsetX = this.offsetX();
    let offsetY = this.offsetY();
    let x = 0;
    let y = 0;

    if (triggerBounrds) {
      x = triggerBounrds.x;
      y = triggerBounrds.y;
    }

    if (this.positionY() === 'bottom' && triggerBounrds) {
      offsetY += triggerBounrds.height;
    }

    if (this.stretchToOrigin() && triggerBounrds) {
      this.renderer2.setStyle(popoverEl, 'width', `${triggerBounrds.width}px`);
    }

    this.renderer2.setStyle(popoverEl, 'left', `${x + offsetX}px`);
    this.renderer2.setStyle(popoverEl, 'top', `${y + offsetY}px`);
  }

  ngOnDestroy(): void {
    this.documenSub?.unsubscribe();
  }
}
