import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPageComponent } from '../../blog/blog-page/blog-page.component';
import { SourceCodeComponent } from '../../blueprint/source-code/source-code.component';

@Component({
  selector: 'doc-schematics-usage-page',
  imports: [BlogPageComponent, SourceCodeComponent, RouterLink],
  templateUrl: './schematics-usage-page.component.html',
  styleUrl: './schematics-usage-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchematicsUsagePageComponent {
  configCode = ` "projectType": "application",
  "schematics": {
    "ngverse:element": {
      "path": "core/ui"
    }
  }`;
}
