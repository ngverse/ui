import { Component, input, output, signal } from '@angular/core';
import { OutsideClickDirective } from '../../../../../../ng-verse/src/lib/outside-click/outside-click.directive';
export type SourceTreeFolder = {
  name: string;
  files: SourceTreeFile[];
  hideName?: boolean;
};

export type SourceTreeFile = {
  name: string;
  path: string;
  language: string;
};

export function genFolder(
  name: string,
  root: string,
  process: (root: string) => SourceTreeFile[],
  hideName?: boolean
): SourceTreeFolder {
  return {
    name: name,
    files: process(root),
    hideName,
  };
}

export function getRegularFile(
  name: string,
  rootPath: string,
  extension = 'ts'
) {
  return {
    name: `${name}.component.${extension}`,
    path: `ng-verse/${rootPath}/${name}.${extension}`,
    language: extension,
  };
}

export function genComponentFile(
  name: string,
  rootPath: string,
  extension = 'ts'
): SourceTreeFile {
  return {
    name: `${name}.component.${extension}`,
    path: `ng-verse/${rootPath}/${name}.component.${extension}`,
    language: extension,
  };
}

export function genFullComponentFiles(
  name: string,
  rootPath: string
): SourceTreeFile[] {
  return [
    genComponentFile(name, rootPath, 'ts'),
    genComponentFile(name, rootPath, 'html'),
    genComponentFile(name, rootPath, 'scss'),
  ];
}

@Component({
  selector: 'doc-source-tree-select',
  imports: [OutsideClickDirective],
  templateUrl: './source-tree-select.component.html',
  styleUrl: './source-tree-select.component.scss',
})
export class SourceTreeSelectComponent {
  isOpen = signal(true);
  fileSelected = output<SourceTreeFile>();

  sourceTree = input<SourceTreeFolder[]>([]);

  close() {
    this.isOpen.set(false);
  }

  open() {
    this.isOpen.set(true);
  }

  fileSelect(file: SourceTreeFile) {
    this.fileSelected.emit(file);
    this.close();
  }
}
