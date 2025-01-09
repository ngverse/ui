import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  input,
  OnInit, output, viewChild,
  ViewContainerRef
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ComponentType } from '@angular/cdk/portal';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  animations: [
    trigger('slideUpDownAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)'}),
        animate('300ms ease-out', style({ transform: 'translateX(0)'})),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
  host: {
    '[@slideUpDownAnimation]': ''
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawerComponent implements OnInit {
  component = input.required<ComponentType<unknown>>();
  data = input<Record<string, unknown> | null>(null);
  overlayRef = input.required<OverlayRef>();
  close = output();

  private componentRef: ComponentRef<unknown> | null = null;

  content = viewChild.required('content', { read: ViewContainerRef });

  ngOnInit() {
    this.componentRef = this.createComponent(this.component());
    const data = this.data();
    if (data && typeof data === 'object') {
      this.setInputs(this.componentRef, data);
    }
  }

  private createComponent(component: ComponentType<unknown>) {
    this.content().clear();
    return this.content().createComponent(component);
  }

  private setInputs(componentRef: ComponentRef<unknown>, data: Record<string, unknown>) {
    for(const key in data) {
      componentRef?.setInput(key, data[key]);
    }
  }
}
