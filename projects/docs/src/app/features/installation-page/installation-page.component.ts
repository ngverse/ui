import { Component, inject, signal } from '@angular/core';
import { BlogPageComponent } from '../../blog/blog-page/blog-page.component';
import { SourceCodeComponent } from '../../blueprint/source-code/source-code.component';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'doc-installation-page',
  imports: [BlogPageComponent, SourceCodeComponent],
  templateUrl: './installation-page.component.html',
  styleUrl: './installation-page.component.css',
})
export class InstallationPageComponent {
  ngVersefile = 'ngverse/ngverse.css';
  fileService = inject(FileService);

  ngVerseStyleContent = signal<string>('');

  tsImportCode = `
  ...
  "compilerOptions": {
    "paths": {
      "@/ui/*": ["./src/app/ui"]
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
       provideAnimationsAsync(),
     ],
};`;

  postcssCode = `{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}`;
}
