import {
  Overlay,
  STANDARD_DROPDOWN_BELOW_POSITIONS,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  inject,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'playground';
  overlay = inject(Overlay);
  el = viewChild.required('el');
  temp = viewChild.required(TemplateRef);
  vf = inject(ViewContainerRef);
  clicked(event: MouseEvent) {
    event.preventDefault();
    const x = event.clientX;
    const y = event.clientY;

    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-backdrop-transparent',
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo({ x, y })
        .withPositions(STANDARD_DROPDOWN_BELOW_POSITIONS),
    });

    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
    overlayRef.keydownEvents().subscribe((e) => {
      if (e.key === 'Escape') {
        overlayRef.dispose();
      }
    });

    const templatePortal = new TemplatePortal(this.temp(), this.vf);

    overlayRef.attach(templatePortal);
    overlayRef.updatePosition();
  }
}
