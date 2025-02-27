import { Component } from '@angular/core';
import { BlogPageComponent } from '../../blog/blog-page/blog-page.component';
import { SourceCodeComponent } from '../../blueprint/source-code/source-code.component';

@Component({
  selector: 'doc-usage-page',
  imports: [BlogPageComponent, SourceCodeComponent],
  templateUrl: './usage-page.component.html',
  styleUrl: './usage-page.component.css',
})
export class UsagePageComponent {}
