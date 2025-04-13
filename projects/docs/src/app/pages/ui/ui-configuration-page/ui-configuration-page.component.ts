import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { BlogPageComponent } from '../../../blog/blog-page/blog-page.component';
import { SourceCodeComponent } from '../../../blueprint/source-code/source-code.component';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'doc-ui-configuration-page',
  imports: [BlogPageComponent, SourceCodeComponent],
  templateUrl: './ui-configuration-page.component.html',
  styleUrl: './ui-configuration-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiConfigurationPageComponent implements OnInit {
  postcssCode = `{
    "plugins": {
      "@tailwindcss/postcss": {}
    }
  }`;

  animationsCode = `import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

  export const appConfig: ApplicationConfig = {
    providers: [
         provideAnimationsAsync()
       ],
  };`;

  configCode = ` 
  ...
  "projectType": "application",
  "schematics": {
    "@ngverse/ui:ui": {
      "path": "ui" // the path where ui components will be generated, adjust as needed
      // you can add other options as well
    }
  }
  ...  
  `;

  tsImportPath = `
  ...
   "paths": {
      "@/ui/*": ["./src/app/ui/*"] // the path where ui components will be, adjust as needed
    },
  ...
  `;

  angularCDKStyleImport = `@import '@angular/cdk/overlay-prebuilt.css';`;

  globalsCode = signal('');
  fileService = inject(FileService);

  ngOnInit(): void {
    this.fileService.getFile('ngverse/ngverse.css').subscribe((data) => {
      this.globalsCode.set(data);
    });
  }
}
