import { Component, inject, signal } from '@angular/core';
import { BlogPageComponent } from '../../blog/blog-page/blog-page.component';
import { SourceCodeComponent } from '../../blueprint/source-code/source-code.component';
import { ProjectNameComponent } from '../../core/project-name/project-name.component';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'doc-installation-page',
  imports: [BlogPageComponent, SourceCodeComponent, ProjectNameComponent],
  templateUrl: './installation-page.component.html',
  styleUrl: './installation-page.component.css',
})
export class InstallationPageComponent {
  ngVersefile = 'ngverse/ngverse.css';
  fileService = inject(FileService);

  ngVerseStyleContent = signal<string>('');

  configCode = ` "projectType": "application",
  "schematics": {
    "@ngverse/ui:add": {
      "path": "ui"
    }
  }`;

  tsImportCode = `
  ...
  "compilerOptions": {
    "paths": {
      "@/ui/*": ["./src/app/ui/*"]
    }
   ....
    `;

  constructor() {
    this.fileService.getFile(this.ngVersefile).subscribe((data) => {
      this.ngVerseStyleContent.set(data);
    });
  }

  animationsCode = `import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
       provideAnimationsAsync()
     ],
};`;

  postcssCode = `{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}`;
}
