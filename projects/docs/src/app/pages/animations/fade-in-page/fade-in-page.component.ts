import { fadeIn } from '@/animations/fade-in.animation';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimationPageComponent } from '../../../animation-page/animation-page.component';

@Component({
  selector: 'doc-fade-in-page',
  imports: [AnimationPageComponent],
  templateUrl: './fade-in-page.component.html',
  styleUrl: './fade-in-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FadeInPageComponent {
  FADE_IN = fadeIn;
}
