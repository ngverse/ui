import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef, computed, ElementRef, inject,
  input,
  OnInit, output, signal, viewChild,
  ViewContainerRef
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ComponentType } from '@angular/cdk/portal';

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
export class SheetBodyComponent implements OnInit {
  component = input.required<ComponentType<unknown>>();
  data = input<Record<string, unknown> | null>(null);
  close = output();

  private componentRef: ComponentRef<unknown> | null = null;

  sheetContent = viewChild.required('sheetContent', { read: ViewContainerRef });

  dragging = false;
  initialY = 0;
  offsetY = 0;

  translateY = signal(0);
  translateValue = computed(() => `translate(0, ${this.translateY()}px)`);

  private readonly el = inject(ElementRef);

  ngOnInit(): void {
    this.componentRef = this.createComponent(this.component());
    const data = this.data();
    if (data && typeof data === 'object') {
      this.setInputs(this.componentRef, data);
    }
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
