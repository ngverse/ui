import { Component } from '@angular/core';
import { AlertBodyComponent } from '@ng-verse/alert/alert-body.component';
import { AlertHeaderComponent } from '@ng-verse/alert/alert-header.component';
import { AlertComponent } from '@ng-verse/alert/alert.component';
import { BlogPageComponent } from '../../blog/blog-page/blog-page.component';

@Component({
  selector: 'doc-introduction-page',
  imports: [
    BlogPageComponent,
    AlertComponent,
    AlertHeaderComponent,
    AlertBodyComponent,
  ],
  templateUrl: './introduction-page.component.html',
  styleUrl: './introduction-page.component.scss',
})
export class IntroductionPageComponent {}
