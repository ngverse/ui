import { inject, Injectable, PLATFORM_ID } from '@angular/core';

import { finalize, map, Observable, of, shareReplay, tap } from 'rxjs';

import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IconRegistry } from './icon.registry';

function createDomParser() {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    return new DOMParser();
  }
  return null;
}

@Injectable({
  providedIn: 'root',
})
export class IconLoaderService {
  private readonly _iconRegistry = inject(IconRegistry);
  private readonly http = inject(HttpClient);
  private readonly _domParser = createDomParser();
  private readonly _iconLoader = new Map<
    string,
    Observable<HTMLElement | null>
  >();
  private readonly _iconCache = new Map<string, HTMLElement>();

  load(name: string) {
    const url = this._iconRegistry.getUrl(name);

    if (!url) {
      throw new Error(
        `Icon with name ${name} not found. Please use IconRegistry.addSvgIcon() to add it.`
      );
    }
    const cachedIcon = this._iconCache.get(url);

    if (cachedIcon) {
      return of(cachedIcon.cloneNode(true) as HTMLElement);
    }
    const iconIsLoading = this._iconLoader.get(url);
    if (iconIsLoading) {
      return iconIsLoading.pipe(
        map((svg) => svg?.cloneNode(true) as HTMLElement)
      );
    }

    return this.fetch(url);
  }

  private fetch(url: string) {
    const http$ = this.http
      .get(url, {
        responseType: 'text',
      })
      .pipe(map((svg) => this.stringToSvg(svg)))
      .pipe(
        tap((svg) => {
          if (svg) {
            this._iconCache.set(url, svg);
          }
        })
      )
      .pipe(finalize(() => this._iconLoader.delete(url)))
      .pipe(shareReplay(1));
    this._iconLoader.set(url, http$);
    return http$;
  }

  private stringToSvg(svgString: string) {
    if (!this._domParser) {
      return null;
    }
    const svg = this._domParser.parseFromString(
      svgString,
      'image/svg+xml'
    ).documentElement;

    if (svg.nodeName !== 'svg') {
      return null;
    }

    return svg;
  }
}
