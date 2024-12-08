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
  data = ['PREVIEW', 'HTML', 'SCSS', 'TS'];
  fileService = inject(FileService);
  selectedTab = signal('Preview');
  code = signal<string>('');

  selectTab() {
    this.selectedTab.set('HTML');
    this.fileService
      .getFile(`examples/button/simple-button/simple-button.component.html`)
      .subscribe((response) => {
        this.code.set(response);
      });
  }
}
