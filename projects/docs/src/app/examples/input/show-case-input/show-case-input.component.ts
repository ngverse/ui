import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../../@/ui/checkbox/checkbox.component';
import { InputDirective } from '../../../@/ui/input/input.directive';

@Component({
  selector: 'doc-show-case-input',
  imports: [InputDirective, FormsModule, CheckboxComponent, FormsModule],
  templateUrl: './show-case-input.component.html',
  styleUrl: './show-case-input.component.css',
})
export class ShowCaseInputComponent {
  username = model();
  password = model();
  age = model(false);
}
