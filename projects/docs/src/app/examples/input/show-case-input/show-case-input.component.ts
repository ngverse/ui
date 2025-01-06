import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '@ng-verse/input/input.component';

@Component({
  selector: 'doc-show-case-input',
  imports: [InputComponent, FormsModule],
  templateUrl: './show-case-input.component.html',
  styleUrl: './show-case-input.component.scss',
})
export class ShowCaseInputComponent {
  username = model();
  password = model();
}
