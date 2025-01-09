import { Overlay } from '@angular/cdk/overlay';
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
  clicked(event: MouseEvent) {}

  showPopover() {
    setTimeout(() => {
      const target = document.querySelector('#target') as HTMLElement;
      const popover = document.querySelector('#popover') as HTMLElement;

      const position = target.getBoundingClientRect();

      popover.style.top = `${position.top}px`;
      popover.style.left = `${position.left}px`;
    });
  }
}
