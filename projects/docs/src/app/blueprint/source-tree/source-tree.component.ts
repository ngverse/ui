import { Component, inject, input, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileService } from '../../services/file.service';
import { SourceCodeComponent } from '../source-code/source-code.component';
import {
  SOURCE_FILE_EXTENSION_TYPE,
  SourceTreeFile,
  SourceTreeFolder,
} from './source-tree-builder';
import { SourceTreeSelectComponent } from './source-tree-select/source-tree-select.component';
import { SourceTreeResolver } from './source-tree.resolver';

@Component({
  selector: 'doc-source-tree',
  imports: [SourceCodeComponent, SourceTreeSelectComponent, FormsModule],
  templateUrl: './source-tree.component.html',
  styleUrl: './source-tree.component.css',
})
export class SourceTreeComponent implements OnInit {
  fileService = inject(FileService);
  private sourceTreeResolver = inject(SourceTreeResolver);

  files = ['html', 'css', 'js', 'spec'];

  code = signal<string>('');

  language = signal<SOURCE_FILE_EXTENSION_TYPE>('ts');

  sourceTree = model<SourceTreeFolder[]>([]);

  auto = input(true);

  includeTests = model();

  name = input.required<string>();

  ngOnInit(): void {
    if (this.auto()) {
      const dir = this.sourceTreeResolver.getSourceTree(this.name());
      if (dir) {
        this.sourceTree.set(dir);
      }
    }
  }

  fileSelected(file: SourceTreeFile) {
    this.language.set(file.language === 'spec.ts' ? 'ts' : file.language);
    this.fileService.getFile(`ngverse/${file.path}`).subscribe((data) => {
      this.code.set(data);
    });
  }
}
