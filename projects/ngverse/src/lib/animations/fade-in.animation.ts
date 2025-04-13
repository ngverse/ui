import {
  animate,
  animation,
  keyframes,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

const name = `fadeIn`;

interface AnimationParams {
  /**
   * animation duration`
   */
  duration?: number;
}

/**
 * fadeIn animation
 */
export const fadeIn = (params?: AnimationParams) =>
  useAnimation(
    animation(
      [
        animate(
          '{{duration}}ms ease-in',
          keyframes([
            style({ opacity: 0, offset: 0 }),
            style({ opacity: 1, offset: 1 }),
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
 * fadeIn animation on :enter
 * @remarks triggerName: `fadeInOnEnter`
 * @example
 */
export const fadeInOnEnter = (params?: AnimationParams) =>
  trigger(`${name}OnEnter`, [transition(':enter', fadeIn(params))]);

/**
 * fadeIn animation on :increment
 * @remarks triggerName: `fadeInOnEnter`
 */
export const fadeInOnIncr = (params?: AnimationParams) =>
  trigger(`${name}OnEnter`, [transition(':increment', fadeIn(params))]);
