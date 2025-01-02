import { Component, input } from '@angular/core';

@Component({
  selector: 'doc-blog-h3',
  imports: [],
  templateUrl: './blog-h3.component.html',
  styleUrl: './blog-h3.component.scss',
})
export class BlogH3Component {
  label = input.required<string>();
}
