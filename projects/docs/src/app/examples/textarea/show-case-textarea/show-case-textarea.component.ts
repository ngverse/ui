import { Component, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from '@ngverse/textarea/textarea.component';

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
