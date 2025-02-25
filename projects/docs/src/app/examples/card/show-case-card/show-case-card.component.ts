import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../@/ui/button/button.component';
import { CardComponent } from '../../../@/ui/card/card.component';
import { InputDirective } from '../../../@/ui/input/input.directive';

@Component({
  selector: 'doc-show-case-card',
  imports: [CardComponent, ButtonComponent, FormsModule, InputDirective],
  templateUrl: './show-case-card.component.html',
  styleUrl: './show-case-card.component.css',
})
export class ShowCaseCardComponent {
  username = model('');
  password = model('');
}
