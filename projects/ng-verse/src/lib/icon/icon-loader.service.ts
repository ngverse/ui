import { inject, Injectable } from '@angular/core';

import { Observable, finalize, of, share, tap } from 'rxjs';

import { IconRegistryService } from './icon-registry.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IconLoaderService {
  private readonly iconsLoadingByUrl = new Map<string, Observable<string>>();
  private readonly iconRegistryService = inject(IconRegistryService);
  private readonly iconsByUrl = new Map<string, string>();
  private readonly http = inject(HttpClient);

  loadSvg(name: string): Observable<string | undefined> {
    const svgIcon = this.iconRegistryService.getSvgIcon(name);

    if (!svgIcon) {
      throw new Error(`Icon with name ${name} not found. Please use IconRegistryService.addSvgIcon() to add it.`);
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
