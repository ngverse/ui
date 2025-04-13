import { Component, inject, input, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileService } from '../../services/file.service';
import { SourceCodeComponent } from '../source-code/source-code.component';
import {
  SOURCE_FILE_EXTENSION_TYPE,
  SourceTreeFile,
  SourceTreeFolder,
} from './source-tree-builder';
import { SourceTreeSelectComponent } from './source-tree-select/source-tree-select.component';

@Component({
  selector: 'doc-source-tree',
  imports: [SourceCodeComponent, SourceTreeSelectComponent, FormsModule],
  templateUrl: './source-tree.component.html',
  styleUrl: './source-tree.component.css',
})
export class SourceTreeComponent {
  fileService = inject(FileService);

  files = ['html', 'css', 'js', 'spec'];

  type = input<'ui' | 'pipes' | 'animations'>('ui');

  code = signal<string>('');

  language = signal<SOURCE_FILE_EXTENSION_TYPE>('ts');

  sourceTree = model<SourceTreeFolder[]>([]);

  includeTests = model();

  fileSelected(file: SourceTreeFile) {
    this.language.set(file.language === 'spec.ts' ? 'ts' : file.language);
    this.fileService
      .getFile(`ngverse/${this.type()}/${file.path}`)
      .subscribe((data) => {
        this.code.set(data);
      });
  }
}
