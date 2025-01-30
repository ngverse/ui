import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlogPageComponent } from '../../blog/blog-page/blog-page.component';
import { SourceCodeComponent } from '../../blueprint/source-code/source-code.component';

@Component({
  selector: 'doc-schematics-usage-page',
  imports: [BlogPageComponent, SourceCodeComponent],
  templateUrl: './schematics-usage-page.component.html',
  styleUrl: './schematics-usage-page.component.scss',
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
