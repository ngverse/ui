import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from 'ngverse/checkbox/checkbox.component';
import { InputComponent } from 'ngverse/input/input.component';

@Component({
  selector: 'doc-show-case-input',
  imports: [InputComponent, FormsModule, CheckboxComponent, FormsModule],
  templateUrl: './show-case-input.component.html',
  styleUrl: './show-case-input.component.scss',
})
export class ShowCaseInputComponent {
  username = model();
  password = model();
  age = model(false);
}
