import { Component, inject, input, signal } from '@angular/core';
import { SourceCodeComponent } from '../source-code/source-code.component';
import { DownloadButtonComponent } from '../download-button/download-button.component';
import { zip } from 'rxjs';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'doc-c-installation',
  imports: [SourceCodeComponent, DownloadButtonComponent],
  templateUrl: './c-installation.component.html',
  styleUrl: './c-installation.component.scss',
})
export class CInstallationComponent {
  name = input.required<string>();
  component = signal<string>('');
  style = signal<string>('');
  html = signal<string>('');
  spec = signal<string>('');
  fileService = inject(FileService);

  getFile(extension: string) {
    return this.fileService.getFile(
      `ng-verse/${this.name()}/${this.name()}.component.${extension}`
    );
  }

  private getSourceName(extension: string) {
    return `${this.name()}.component.${extension}`;
  }

  ngOnInit(): void {
    const comp = this.getFile('ts');
    const style = this.getFile('scss');
    const html = this.getFile('html');
    const spec = this.getFile('spec.ts');

    zip([comp, style, html, spec]).subscribe((data) => {
      this.component.set(data[0]);
      this.style.set(data[1]);
      this.html.set(data[2]);
      this.spec.set(data[3]);
    });
  }

  download() {
    this.fileService.downloadFiles(this.name(), [
      {
        name: this.getSourceName('html'),
        content: this.html(),
      },
      {
        name: this.getSourceName('scss'),
        content: this.style(),
      },
      {
        name: this.getSourceName('ts'),
        content: this.component(),
      },
      {
        name: this.getSourceName('spec.ts'),
        content: this.spec(),
      },
    ]);
  }
}
