import {
  Component,
  computed,
  effect,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChevronDown, Folder, LucideAngularModule } from 'lucide-angular';
import { OptionGroupLabelComponent } from 'ngverse/select/option-group-label.component';
import { OptionGroupComponent } from 'ngverse/select/option-group.component';
import { OptionComponent } from 'ngverse/select/option.component';
import { SelectComponent } from 'ngverse/select/select.component';
import { SourceTreeFile, SourceTreeFolder } from '../source-tree-builder';

@Component({
  selector: 'doc-source-tree-select',
  imports: [
    LucideAngularModule,
    SelectComponent,
    OptionComponent,
    FormsModule,
    OptionGroupComponent,
    OptionGroupLabelComponent,
  ],
  templateUrl: './source-tree-select.component.html',
  styleUrl: './source-tree-select.component.scss',
})
export class SourceTreeSelectComponent {
  isOpen = signal(true);
  fileSelected = output<SourceTreeFile>();

  selectedFile = model<SourceTreeFile | undefined>(undefined);

  sourceTree = input<SourceTreeFolder[]>([]);

  allFiles = computed(() => this.sourceTree().flatMap((sour) => sour.files));

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
        this.fileSelect();
      }
    });
  }

  close() {
    this.isOpen.set(false);
  }

  open() {
    this.isOpen.set(true);
  }

  fileSelect() {
    const file = this.selectedFile();
    if (file) {
      this.fileSelected.emit(file);
    }
    this.close();
  }
}
