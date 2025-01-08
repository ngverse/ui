import { Component, inject, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { IconLoaderService } from './icon-loader.service';
import { DomSanitizer } from '@angular/platform-browser';
import { map, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-icon',
  imports: [
    AsyncPipe
  ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  name = input.required<string>();

  iconContent$ = toObservable(this.name).pipe(
    switchMap((name) => this.iconLoaderService.loadSvg(name)),
     map((svgContent) =>
      this.sanitizer.bypassSecurityTrustHtml(svgContent as string)
    ));

  private readonly iconLoaderService = inject(IconLoaderService);
  private readonly sanitizer = inject(DomSanitizer);
}
