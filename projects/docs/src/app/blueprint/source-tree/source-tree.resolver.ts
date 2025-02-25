import { Injectable } from '@angular/core';
import data from '../../../tree-structure.json';
import { SourceTreeFile, SourceTreeFolder } from './source-tree-builder';
@Injectable({
  providedIn: 'root',
})
export class SourceTreeResolver {
  getSourceTree(name: string) {
    const foundDir = data.files.find((folder) => folder.name === name);
    if (!foundDir || !foundDir.files) {
      console.warn('Dir not found ', name);
      return;
    }
    const flattenDirs: SourceTreeFolder[] = [];

    const rootFolder: SourceTreeFolder = {
      name: '',
      files: [],
      hideName: false,
    };
    flattenDirs.push(rootFolder);

    for (const dir of foundDir.files) {
      //If it is folder
      if (dir.files) {
        flattenDirs.push({
          name: dir.name,
          files: dir.files as SourceTreeFile[],
          hideName: false,
        });
      } else {
        rootFolder.files.push(dir as unknown as SourceTreeFile);
      }
    }

    return flattenDirs;
  }
}
