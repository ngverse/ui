import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { map } from 'rxjs';

import { SvgLoaderService } from './svg-loader.service';

@Pipe({
  name: 'loadSvg',
  standalone: true,
})
export class LoadSvgPipe implements PipeTransform {
  private readonly svgLoaderService = inject(SvgLoaderService);
  private readonly sanitizer = inject(DomSanitizer);

  transform(svg: string) {
    return this.svgLoaderService
      .loadSvg(svg)
      .pipe(
        map((svgContent) =>
          this.sanitizer.bypassSecurityTrustHtml(svgContent as string)
        )
      );
  }
}
