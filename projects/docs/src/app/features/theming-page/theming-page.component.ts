import { Component, inject, OnInit, signal } from '@angular/core';
import { BlogPageComponent } from '../../blog/blog-page/blog-page.component';
import { SourceCodeComponent } from '../../blueprint/source-code/source-code.component';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'doc-theming-page',
  templateUrl: './theming-page.component.html',
  styleUrl: './theming-page.component.css',
  imports: [BlogPageComponent, SourceCodeComponent],
})
export class ThemingPageComponent implements OnInit {
  globalsCode = signal('');
  fileService = inject(FileService);

  ngOnInit(): void {
    this.fileService.getFile('ngverse/ngverse.css').subscribe((data) => {
      this.globalsCode.set(data);
    });
  }
}
