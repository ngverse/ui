import { Component, inject, input, signal } from '@angular/core';
import { zip } from 'rxjs';
import { FileService } from '../../services/file.service';
import { SourceCodeComponent } from '../source-code/source-code.component';
import { SourceTreeSelectComponent } from './source-tree-select/source-tree-select.component';
import { SourceTreeFile, SourceTreeFolder } from './source-tree-builder';

@Component({
  selector: 'doc-source-tree',
  imports: [SourceCodeComponent, SourceTreeSelectComponent],
  templateUrl: './source-tree.component.html',
  styleUrl: './source-tree.component.scss',
})
export class SourceTreeComponent {
  fileService = inject(FileService);

  files = ['html', 'css', 'js', 'spec'];

  code = signal<string>('');

  sourceTree = input<SourceTreeFolder[]>([]);

  fileSelected(file: SourceTreeFile) {
    this.fileService.getFile(file.path).subscribe((data) => {
      this.code.set(data);
    });
  }

  download(){
    console.log("DOWNLAOD")
  }
}
