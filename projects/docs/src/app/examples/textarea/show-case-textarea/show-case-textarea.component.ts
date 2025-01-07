import { Component, model } from '@angular/core';
import { TextareaComponent } from '@ng-verse/textarea/textarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'doc-show-case-textarea',
  imports: [TextareaComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './show-case-textarea.component.html',
  styleUrl: './show-case-textarea.component.scss',
})
export class ShowCaseTextareaComponent {
  description = model();
  text = model();
}
