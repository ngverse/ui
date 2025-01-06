import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef, computed, effect, ElementRef, inject,
  input, OnDestroy,
  OnInit, output, Renderer2, signal, viewChild,
  ViewContainerRef
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ComponentType } from '@angular/cdk/portal';
import { OverlayRef } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';

const DRAG_UP_SPEED_REDUCE = 0.05; // if user drags up we reduce the speed so he still see that sheet is moving up but with reduced effect

@Component({
  selector: 'app-sheet-body',
  imports: [],
  templateUrl: './sheet-body.component.html',
  styleUrl: './sheet-body.component.scss',
  animations: [
    trigger('slideUpDownAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)'}),
        animate('300ms ease-out', style({ transform: 'translateY(0)'})),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
  host: {
    '[@slideUpDownAnimation]': '',
    '(mousedown)': 'onMouseDown($event)',
    '(document:mousemove)': 'onMouseMove($event)',
    '(document:mouseup)': 'onMouseUp()',
    '[style.transform]': 'translateValue()',
    '[class.dragging]': 'dragging'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SheetBodyComponent implements OnInit, OnDestroy {
  component = input.required<ComponentType<unknown>>();
  data = input<Record<string, unknown> | null>(null);
  overlayRef = input.required<OverlayRef>();
  close = output();

  private componentRef: ComponentRef<unknown> | null = null;

  sheetContent = viewChild.required('sheetContent', { read: ViewContainerRef });

  dragging = false;
  initialY = 0;
  offsetY = 0;

  translateY = signal(0);
  translateValue = computed(() => `translate(0, ${this.translateY()}px)`);

  draggedPercentage = computed(() => this.translateY() / this.el.nativeElement.offsetHeight);

  private readonly el = inject(ElementRef);
  private readonly renderer2 = inject(Renderer2);
  private readonly document = inject(DOCUMENT)

  constructor() {
    effect(() => {
      this.setBackdropOpacity(this.draggedPercentage());
    });
  }

  ngOnInit() {

    this.componentRef = this.createComponent(this.component());
    const data = this.data();
    if (data && typeof data === 'object') {
      this.setInputs(this.componentRef, data);
    }

    const appRoot = this.document.body.children[0];

    this.renderer2.setStyle(appRoot, 'display', 'block');
    this.renderer2.setStyle(appRoot, 'transform', 'scale(0.9864583333333333) translate3d(0, 14px, 0)');
    this.renderer2.setStyle(appRoot, 'transform-origin', 'center top');
    this.renderer2.setStyle(appRoot, 'transition-property', 'transform, border-radius');
    this.renderer2.setStyle(appRoot, 'transition-duration', '0.5s');
    this.renderer2.setStyle(appRoot, 'transition-timing-function', 'cubic-bezier(0.32, 0.72, 0, 1)');
    this.renderer2.setStyle(appRoot, 'background', '#fff');
    this.renderer2.setStyle(appRoot, 'border-radius', '8px');
    this.renderer2.setStyle(this.document.body, 'background', '#000');

  }

  ngOnDestroy() {
    //this.renderer2.removeStyle(this.document.body.children[0], 'display');
    //this.renderer2.removeStyle(this.document.body.children[0], 'transition');
    this.renderer2.setStyle(this.document.body.children[0], 'transform', 'scale(1)');
    //this.renderer2.removeStyle(this.document.body.children[0], 'background');
    //this.renderer2.removeStyle(this.document.body, 'background');
    this.renderer2.setStyle(this.document.body.children[0], 'border-radius', '0');
  }

  private setBackdropOpacity(draggedPercentage: number) {
    const startOpacity = 0.8;
    const minOpacity = 0.05;
    const backgroundOpacity = Math.max(startOpacity - draggedPercentage, minOpacity);
    this.renderer2.setStyle(this.overlayRef().backdropElement, 'background-color', `rgba(0, 0, 0, ${backgroundOpacity})`);
  }

  onMouseDown(event: MouseEvent) {
    this.dragging = true;
    this.initialY = event.clientY;
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent) {
    if (!this.dragging) return;
    let deltaY = event.clientY - this.initialY;

    const isDraggingUp = deltaY < 0;

    if (isDraggingUp) {
      deltaY *= DRAG_UP_SPEED_REDUCE;
    }

    this.translateY.set(this.offsetY + deltaY);
  }

  onMouseUp() {
    if (this.dragging) {
      this.dragging = false;
      const triggerThresholdHeight = this.el.nativeElement.offsetHeight / 4; // if user drags 25% of the sheet height, close the sheet
      if (triggerThresholdHeight < this.translateY()) {
        this.close.emit();
      } else {
        this.translateY.set(0);
      }
    }
  }

  private createComponent(component: ComponentType<unknown>) {
    this.sheetContent().clear();
    return this.sheetContent().createComponent(component);
  }

  private setInputs(componentRef: ComponentRef<unknown>, data: Record<string, unknown>) {
    for(const key in data) {
      componentRef?.setInput(key, data[key]);
    }
  }
}
