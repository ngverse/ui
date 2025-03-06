import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-button-loader',
  imports: [],
  template: `<div class="button-loader">
    <div class="spinner"></div>
  </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .button-loader {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none;
    }

    .spinner {
      width: 20px;
      height: 20px;
      border: 3px solid var(--spinner-color);
      border-bottom-color: transparent;
      border-radius: 50%;
      animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,
})
export class ButtonLoaderComponent {}
