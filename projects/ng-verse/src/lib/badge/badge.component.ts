import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  value = input.required<string | number | undefined | null>();
  hide = input<boolean>(false);
  useParent = signal(true);
  renderer = inject(Renderer2);
  host = inject(ElementRef<HTMLElement>);

  constructor() {
    effect(() => {
      if (this.useParent()) {
        this.renderer.setStyle(this.host.nativeElement, 'position', 'relative');
      }
    });
  }
}
