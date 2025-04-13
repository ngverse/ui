import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlogPageComponent } from '../../../blog/blog-page/blog-page.component';
import { SourceCodeComponent } from '../../../blueprint/source-code/source-code.component';

@Component({
  selector: 'doc-animation-configuration-page',
  imports: [BlogPageComponent, SourceCodeComponent],
  templateUrl: './animation-configuration-page.component.html',
  styleUrl: './animation-configuration-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimationConfigurationPageComponent {
  configCode = ` 
  ...
  "projectType": "application",
  "schematics": {
    "@ngverse/ui:animation": {
      "path": "animations" // the path where animations generated, adjust as needed
      // you can add other options as well
    }
  }
  ...  
  `;

  tsImportPath = `
  ...
   "paths": {
      "@/animations/*": ["./src/app/animations/*"] // the path where ui components will be, adjust as needed
    },
  ...
  `;
}
