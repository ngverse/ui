import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'status',
  },
})
export class BadgeComponent {
  value = input.required<string | number | undefined | null>();
  hide = input<boolean>(false);
  useParent = input(true);

  private renderer = inject(Renderer2);
  private host = inject(ElementRef<HTMLElement>);

  constructor() {
    afterNextRender({
      write: () => {
        if (this.useParent()) {
          this.renderer.setStyle(
            this.host.nativeElement,
            'position',
            'relative'
          );
        }
      },
    });
  }
}
