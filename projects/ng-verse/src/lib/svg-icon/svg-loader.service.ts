import { inject, Injectable } from '@angular/core';

import { Observable, finalize, of, share, tap } from 'rxjs';

import { SvgIconRegistryService } from './svg-icon-registry.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SvgLoaderService {
  private readonly iconsLoadingByUrl = new Map<string, Observable<string>>();
  private readonly svgIconRegistryService = inject(SvgIconRegistryService);
  private readonly iconsByUrl = new Map<string, string>();
  private readonly http = inject(HttpClient);

  loadSvg(name: string): Observable<string | undefined> {
    const svgIcon = this.svgIconRegistryService.getSvgIcon(name);

    if (!svgIcon) {
      throw new Error(`svgIcon with name ${name} not found. Please use SvgIconRegistryService.addSvgIcon() to add it.`);
    }

    if (this.iconsByUrl.has(name)) {
      return of(this.iconsByUrl.get(name));
    } else if (this.iconsLoadingByUrl.has(name)) {
      return this.iconsLoadingByUrl.get(name) as Observable<string>;
    }

    const o = this.getSvg(svgIcon.url).pipe(
      tap((svg) => {
        if (svgIcon.options.cache) {
          this.iconsByUrl.set(name, svg);
        }
      }),
      finalize(() => this.iconsLoadingByUrl.delete(name)),
      share()
    );

    this.iconsLoadingByUrl.set(name, o);

    return o;
  }

  private getSvg(url: string): Observable<string> {
    return this.http.get(url, {
      responseType: 'text'
    });
  }
}
