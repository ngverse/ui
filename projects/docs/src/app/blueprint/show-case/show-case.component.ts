import { UpperCasePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { TabGroupComponent } from '@ng-verse/tab/tab-group/tab-group.component';
import { TabComponent } from '@ng-verse/tab/tab.component';
import { FileService } from '../../services/file.service';
import { SourceCodeComponent } from '../source-code/source-code.component';

@Component({
  selector: 'doc-show-case',
  imports: [
    SourceCodeComponent,
    TabGroupComponent,
    TabComponent,
    UpperCasePipe,
  ],
  templateUrl: './show-case.component.html',
  styleUrl: './show-case.component.scss',
})
export class ShowCaseComponent {
  tabs = ['ts', 'html', 'scss'];
  fileService = inject(FileService);
  code = signal<string>('');
  language = signal<string>('');
  name = input.required<string>();

  tabChanged($event: number) {
    if ($event !== 0) {
      const extension = this.tabs[$event - 1];
      this.language.set(extension);
      this.fileService
        .getFile(
          `examples/${this.name()}/show-case-${this.name()}/show-case-${this.name()}.component.${extension}`
        )
        .subscribe((response) => {
          if (!response) {
            this.code.set('Empty File');
          } else {
            this.code.set(response);
          }
        });
    }
  }
}
