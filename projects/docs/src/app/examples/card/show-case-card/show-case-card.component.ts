import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../../../ngverse/src/lib/button/button.component';
import { CardComponent } from '../../../../../../ngverse/src/lib/card/card.component';
import { InputDirective } from '../../../../../../ngverse/src/lib/input/input.directive';

@Component({
  selector: 'doc-show-case-card',
  imports: [CardComponent, ButtonComponent, FormsModule, InputDirective],
  templateUrl: './show-case-card.component.html',
  styleUrl: './show-case-card.component.scss',
})
export class ShowCaseCardComponent {
  username = model('');
  password = model('');
}
