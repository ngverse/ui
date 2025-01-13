import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { map, switchMap } from 'rxjs';
import { IconLoaderService } from './icon-loader.service';

@Component({
  selector: 'app-icon',
  imports: [AsyncPipe],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  name = input.required<string>();

  iconContent$ = toObservable(this.name).pipe(
    switchMap((name) => this.iconLoaderService.loadSvg(name)),
    map((svgContent) =>
      this.sanitizer.bypassSecurityTrustHtml(svgContent as string)
    )
  );

  private readonly iconLoaderService = inject(IconLoaderService);
  private readonly sanitizer = inject(DomSanitizer);
}
