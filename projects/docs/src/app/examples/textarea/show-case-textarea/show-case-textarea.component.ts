import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaDirective } from '@ng-verse/textarea/textarea.directive';

@Component({
  selector: 'doc-show-case-textarea',
  imports: [TextareaDirective, FormsModule],
  templateUrl: './show-case-textarea.component.html',
  styleUrl: './show-case-textarea.component.scss',
})
export class ShowCaseTextareaComponent {
  title = model();

  description = model();
}
