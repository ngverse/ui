import { Component, inject, input, signal } from '@angular/core';
import { FileService } from '../../services/file.service';
import { SourceCodeComponent } from '../source-code/source-code.component';

@Component({
  selector: 'doc-show-case',
  imports: [SourceCodeComponent],
  templateUrl: './show-case.component.html',
  styleUrl: './show-case.component.scss',
})
export class ShowCaseComponent {
  tabs = ['preview', 'ts', 'html', 'scss'];
  fileService = inject(FileService);
  selectedTab = signal('preview');
  code = signal<string>('');
  name = input.required<string>();


  selectTab(tab: string) {
    this.selectedTab.set(tab);
    if (tab !== 'preview') {
      this.fileService
        .getFile(
          `examples/${this.name()}/show-case-${this.name()}/show-case-${this.name()}.component.${tab}`
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
