import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { SourceTreeFolder } from '../blueprint/source-tree/source-tree-builder';
import { delay, map, tap } from 'rxjs/operators';
import { lastValueFrom, of } from 'rxjs';

export const EMPTY_FILE_TOKEN = 'Empty File';

interface FileType {
  name: string;
  content: Blob | string;
}

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private http = inject(HttpClient);
  private _cache = new Map<string, string>();

  getFile(path: string) {
    if (this._cache.has(path)) {
      return of(this._cache.get(path) as string).pipe(delay(0));
    }
    return this.http
      .get(path, {
        responseType: 'text',
      })
      .pipe(
        tap((response) => {
          this._cache.set(path, response);
        }),
        map((response) => {
          if (!response) {
            return EMPTY_FILE_TOKEN;
          }
          return response;
        })
      );
  }

  downloadSourceTree(zipName: string, sourceTree: SourceTreeFolder[]) {
    const zip = new JSZip();
    const filePromises: Promise<void>[] = [];

    for (const folder of sourceTree) {
      let jsFolder: JSZip | null;
      if (!folder.hideName) {
        jsFolder = zip.folder(folder.name);
      }
      for (const file of folder.files) {
        // Wrap the subscription in a Promise
        const filePromise = lastValueFrom(
          this.getFile(file.path).pipe(
            map((content) => {
              if (folder.hideName) {
                zip.file(file.name, content);
              } else {
                jsFolder?.file(file.name, content);
              }
            })
          )
        );

        filePromises.push(filePromise);
      }
    }

    // Wait for all file promises to resolve
    Promise.all(filePromises)
      .then(() => {
        // Generate ZIP file and trigger download
        zip
          .generateAsync({ type: 'blob' })
          .then((blob) => {
            saveAs(blob, zipName);
          })
          .catch((error) => {
            console.error('Error generating ZIP', error);
          });
      })
      .catch((error) => {
        console.error('Error processing files', error);
      });
  }

  downloadFile(zipName: string, file: FileType) {
    const zip = new JSZip();

    zip.file(file.name, file.content, {});

    // Generate ZIP file and trigger download
    zip
      .generateAsync({ type: 'blob' })
      .then((blob) => {
        saveAs(blob, zipName);
      })
      .catch((error) => {
        console.error('Error generating ZIP', error);
      });
  }

  downloadFiles(zipName: string, files: FileType[]): void {
    const zip = new JSZip();

    // Add files to the ZIP
    files.forEach((file) => {
      zip.file(file.name, file.content, {});
    });

    // Generate ZIP file and trigger download
    zip
      .generateAsync({ type: 'blob' })
      .then((blob) => {
        saveAs(blob, zipName);
      })
      .catch((error) => {
        console.error('Error generating ZIP', error);
      });
  }
}
