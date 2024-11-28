import { Component, inject, input, signal } from '@angular/core';
import { SourceCodeComponent } from '../source-code/source-code.component';
import { DownloadButtonComponent } from '../download-button/download-button.component';
import { zip } from 'rxjs';
import { FileService } from '../../services/file.service';
import { TabsComponent } from '../../core/tabs/tabs.component';
import { TabItemComponent } from '../../core/tabs/tab-item/tab-item.component';
import { SourceTreeFolder } from '../source-tree/source-tree-builder';

@Component({
  selector: 'doc-c-installation',
  imports: [
    SourceCodeComponent,
    DownloadButtonComponent,
    TabsComponent,
    TabItemComponent,
  ],
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

  sourceTree = input<SourceTreeFolder[]>([]);

  getFile(extension: string) {
    return this.fileService.getFile(
      `ng-verse/${this.name()}/${this.name()}.component.${extension}`
    );
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
    this.fileService.downloadSourceTree(this.name(), this.sourceTree());
  }
}
