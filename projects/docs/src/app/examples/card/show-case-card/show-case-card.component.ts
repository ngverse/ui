import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { CardComponent } from '@ng-verse/card/card.component';
import { InputDirective } from '@ng-verse/input/input.directive';

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
