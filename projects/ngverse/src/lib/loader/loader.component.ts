import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
} from '@angular/core';

type Transparency = 'none' | 'semi' | 'full';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.overlay]': 'overlay()',
    '[style.--loader-overlay-opacity]': 'opacity()',
  },
})
export class LoaderComponent {
  radius = input<number>(50);
  overlay = input<boolean>(false);
  useParent = input(true);
  transparency = input<Transparency>('semi');

  private renderer = inject(Renderer2);
  private parentEl = inject<ElementRef<HTMLElement>>(ElementRef, {
    skipSelf: true,
    optional: true,
  });

  opacity = computed(() => {
    switch (this.transparency()) {
      case 'full':
        return 1;
      case 'semi':
        return 0.1;
      case 'none':
        return 0;
    }
  });

  constructor() {
    effect(() => {
      if (this.useParent() && this.parentEl) {
        this.renderer.setStyle(
          this.parentEl.nativeElement,
          'position',
          'relative'
        );
      }
    });
  }
}
