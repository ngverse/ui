import { Component, input } from '@angular/core';

@Component({
  selector: 'doc-blog-page',
  imports: [],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
})
export class BlogPageComponent {
  label = input.required<string>();
}
