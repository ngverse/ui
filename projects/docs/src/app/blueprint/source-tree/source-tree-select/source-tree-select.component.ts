import { Component, effect, input, output, signal } from '@angular/core';
import {
  ChevronDown,
  Folder,
  LucideAngularModule
} from 'lucide-angular';
import { OutsideClickDirective } from '../../../../../../ng-verse/src/lib/outside-click/outside-click.directive';
import { SourceTreeFile, SourceTreeFolder } from '../source-tree-builder';

@Component({
  selector: 'doc-source-tree-select',
  imports: [OutsideClickDirective, LucideAngularModule],
  templateUrl: './source-tree-select.component.html',
  styleUrl: './source-tree-select.component.scss',
})
export class SourceTreeSelectComponent {
  isOpen = signal(true);
  fileSelected = output<SourceTreeFile>();

  selectedFile = signal<SourceTreeFile | undefined>(undefined);

  sourceTree = input<SourceTreeFolder[]>([]);

  ChevronDown = ChevronDown;
  Folder = Folder;

  constructor() {
    effect(() => {
      if (this.selectedFile()) {
        return;
      }
      const sourceTree = this.sourceTree();
      if (sourceTree.length) {
        const newFile = sourceTree[0].files[0];
        this.selectedFile.set(newFile);
        this.fileSelect(newFile);
      }
    });
  }

  close() {
    this.isOpen.set(false);
  }

  open() {
    this.isOpen.set(true);
  }

  fileSelect(file: SourceTreeFile) {
    this.fileSelected.emit(file);
    this.selectedFile.set(file);
    this.close();
  }
}
