import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef, computed, ElementRef, inject,
  input,
  OnInit, output, signal,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-sheet-body',
  imports: [],
  templateUrl: './sheet-body.component.html',
  styleUrl: './sheet-body.component.scss',
  animations: [
    trigger('slideUpAnimation', [
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
    '[@slideUpAnimation]': '',
    '(mousedown)': 'onMouseDown($event)',
    '(document:mousemove)': 'onMouseMove($event)',
    '(document:mouseup)': 'onMouseUp($event)',
    '[style.transform]': 'translateValue()',
    '[class.dragging]': 'dragging'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SheetBodyComponent implements OnInit {
  component = input.required<ComponentType<unknown>>();
  data = input<Record<string, unknown> | null>(null)
  close = output()

  private componentRef: ComponentRef<unknown> | null = null;

  @ViewChild('dynamicContent', { read: ViewContainerRef, static: true })
  dynamicContent!: ViewContainerRef;

  dragging = false;
  initialY = 0;
  offsetY = 0;

  translateY = signal(0);

  translateValue = computed(() => `translate(0, ${this.translateY()}px)`);

  private readonly el = inject(ElementRef);

  ngOnInit(): void {
    this.dynamicContent.clear();
    this.componentRef = this.dynamicContent.createComponent(this.component());
    const data = this.data();
    if (typeof data === 'object') {
      for(const key in data) {
        this.componentRef?.setInput(key, data[key]);
      }
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

    if (deltaY < 0) {
      deltaY *= 0.05;
    }

    this.translateY.set(this.offsetY + deltaY);
  }

  onMouseUp(event: MouseEvent) {
    if (this.dragging) {
      this.dragging = false;
      if (this.el.nativeElement.offsetHeight / 4 < this.translateY()) {
        this.close.emit();
      } else {
        this.translateY.set(0);
      }

    }
  }
}
