import { Component, input } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'doc-source-code',
  imports: [Highlight],
  templateUrl: './source-code.component.html',
  styleUrl: './source-code.component.scss',
})
export class SourceCodeComponent {
  code = input.required<string>();
  language = input.required<string>();
}
