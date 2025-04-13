import {
  animate,
  animation,
  keyframes,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

const name = `fadeInUp`;

interface AnimationParams {
  /**
   * animation duration`
   */
  duration?: number;
}

/**
 * fadeInUp animation
 */
export const fadeInUp = (params?: AnimationParams) =>
  useAnimation(
    animation(
      [
        animate(
          '{{duration}}ms ease-in',
          keyframes([
            style({
              opacity: 0,
              transform: 'translate3d(0, 100%, 0)',
              offset: 0,
            }),
            style({ opacity: 1, transform: 'translate3d(0, 0, 0)', offset: 1 }),
          ])
        ),
      ],
      {
        params: {
          duration: 250,
          ...params,
        },
      }
    )
  );

/**
 * fadeInUp animation on :enter
 * @remarks triggerName: `fadeInUpOnEnter`
 * @example
 */
export const fadeInUpOnEnter = (params?: AnimationParams) =>
  trigger(`${name}OnEnter`, [transition(':enter', fadeInUp(params))]);

/**
 * fadeInUp animation on :increment
 * @remarks triggerName: `fadeInUpOnEnter`
 */
export const fadeInUpOnIncr = (params?: AnimationParams) =>
  trigger(`${name}OnEnter`, [transition(':increment', fadeInUp(params))]);
