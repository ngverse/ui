import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fadeInUp } from '@ngverse/motion/animatecss';
import { AnimationPageComponent } from '../../../animation-page/animation-page.component';

@Component({
  selector: 'doc-fade-in-up-page',
  imports: [AnimationPageComponent],
  templateUrl: './fade-in-up-page.component.html',
  styleUrl: './fade-in-up-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FadeInUpPageComponent {
  FADE_IN_UP = fadeInUp;
}
