import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
  signal,
  untracked,
} from '@angular/core';
import { IconLoaderService } from './icon-loader.service';

const INITIAL_WIDTH = 24;
const INITIAL_HEIGHT = 24;

function coerceSize(value: number | string) {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
}

@Component({
  selector: 'app-icon',
  template: '',
  styles: `
    :host {
      display: inline-block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  name = input.required<string>();
  stretch = input(false);
  width = input<number | string>(INITIAL_WIDTH);
  height = input<number | string>(INITIAL_HEIGHT);

  private readonly iconLoaderService = inject(IconLoaderService);
  private renderer = inject(Renderer2);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  icon = signal<HTMLElement | undefined>(undefined);

  constructor() {
    effect(() => {
      const name = this.name();
      if (!name) {
        return;
      }
      this.iconLoaderService.load(name).subscribe((icon) => {
        if (!icon) {
          return;
        }
        untracked(() => {
          const existingIcon = this.icon();
          if (existingIcon) {
            this.renderer.removeChild(this.host.nativeElement, existingIcon);
          }
        });
        this.icon.set(icon);
        this.renderer.appendChild(this.host.nativeElement, icon);
      });
    });

    effect(() => {
      const icon = this.icon();
      if (!icon) {
        return;
      }
      if (this.stretch()) {
        this.renderer.setAttribute(icon, 'width', '100%');
        this.renderer.setAttribute(icon, 'height', '100%');
      } else {
        const coerceWdth = coerceSize(this.width());
        const coerceHeight = coerceSize(this.height());

        this.renderer.setAttribute(icon, 'width', coerceWdth);
        this.renderer.setAttribute(icon, 'height', coerceHeight);
      }
    });
  }
}
