import { Component, input } from '@angular/core';

@Component({
  selector: 'doc-blog-h4',
  imports: [],
  templateUrl: './blog-h4.component.html',
  styleUrl: './blog-h4.component.css',
})
export class BlogH4Component {
  label = input.required<string>();
}
