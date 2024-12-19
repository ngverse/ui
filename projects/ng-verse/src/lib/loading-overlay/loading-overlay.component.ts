import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';

type BackgroundTypes = 'none' | 'semi' | 'full';

@Component({
  selector: 'app-loading-overlay',
  imports: [ProgressSpinnerComponent],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.scss',
})
export class LoadingOverlayComponent implements OnInit {
  useParent = input(true);

  loading = input(false);

  spinnerRadius = input<number>(50);

  background = input<BackgroundTypes>('semi');

  opacity = computed(() => {
    switch (this.background()) {
      case 'full':
        return 1;
      case 'semi':
        return 0.7;
      case 'none':
        return 0;
    }
  });

  parentEl = inject<ElementRef<HTMLElement>>(ElementRef, {
    skipSelf: true,
    optional: true,
  });

  ngOnInit(): void {
    if (this.useParent() && this.parentEl) {
      const parentNative = this.parentEl.nativeElement;
      const currentPosition = parentNative.style.position;
      if (currentPosition !== 'relative' && currentPosition !== 'absolute') {
        parentNative.style.position = 'relative';
      }
    }
  }
}
