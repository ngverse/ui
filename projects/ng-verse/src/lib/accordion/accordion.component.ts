import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { AccordionState } from './accordion.state';

@Component({
  selector: 'app-accordion',
  imports: [],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AccordionState],
})
export class AccordionComponent {
  state = inject(AccordionState);

  multi = input<boolean, boolean>(false, {
    transform: (value) => {
      this.state.multi.set(value);
      return value;
    },
  });
}
