import { TextareaDirective } from '@/ui/textarea/textarea.directive';
import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'doc-show-case-textarea',
  imports: [TextareaDirective, FormsModule],
  templateUrl: './show-case-textarea.component.html',
  styleUrl: './show-case-textarea.component.css',
})
export class ShowCaseTextareaComponent {
  title = model();

  description = model();
}
