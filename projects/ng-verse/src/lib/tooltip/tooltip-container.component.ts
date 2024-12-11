import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { TooltipOriginDirective } from './tooltip-origin.directive';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class TooltipContainerComponent implements AfterViewInit {
  tooltip = viewChild(TemplateRef);
  overlay = inject(Overlay);
  vf = inject(ViewContainerRef);
  origin = input<TooltipOriginDirective>();
  portal = computed(
    () => new TemplatePortal(this.tooltip() as TemplateRef<unknown>, this.vf)
  );

  ngAfterViewInit(): void {
    const originElement = this.origin()?.el.nativeElement as HTMLElement;
    originElement.addEventListener('click', () => {
      const overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .flexibleConnectedTo(originElement)
          .withPositions([
            {
              originX: 'start',
              originY: 'bottom',
              overlayX: 'start',
              overlayY: 'top',
            },
          ]),
      });
      overlayRef.attach(this.portal());
    });
  }
}
