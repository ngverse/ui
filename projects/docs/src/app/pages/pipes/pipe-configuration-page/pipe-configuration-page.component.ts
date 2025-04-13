import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlogPageComponent } from '../../../blog/blog-page/blog-page.component';
import { SourceCodeComponent } from '../../../blueprint/source-code/source-code.component';

@Component({
  selector: 'doc-pipe-configuration-page',
  imports: [BlogPageComponent, SourceCodeComponent],
  templateUrl: './pipe-configuration-page.component.html',
  styleUrl: './pipe-configuration-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipeConfigurationPageComponent {
  configCode = ` 
  ...
  "projectType": "application",
  "schematics": {
    "@ngverse/ui:pipe": {
      "path": "pipes" // the path where pipes generated, adjust as needed
      // you can add other options as well
    }
  }
  ...  
  `;

  tsImportPath = `
  ...
   "paths": {
      "@/pipes/*": ["./src/app/pipes/*"] // the path where ui components will be, adjust as needed
    },
  ...
  `;
}
