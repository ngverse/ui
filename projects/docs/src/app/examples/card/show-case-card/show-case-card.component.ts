import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@ngverse/button/button.component';
import { CardComponent } from '@ngverse/card/card.component';
import { InputComponent } from '@ngverse/input/input.component';

@Component({
  selector: 'doc-show-case-card',
  imports: [CardComponent, ButtonComponent, FormsModule, InputComponent],
  templateUrl: './show-case-card.component.html',
  styleUrl: './show-case-card.component.scss',
})
export class ShowCaseCardComponent {
  username = model('');
  password = model('');
}
