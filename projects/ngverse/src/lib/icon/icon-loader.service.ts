import { inject, Injectable, PLATFORM_ID } from '@angular/core';

import { finalize, map, Observable, of } from 'rxjs';

import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IconRegistryService } from './icon-registry.service';

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
  private readonly iconsLoadingByUrl = new Map<
    string,
    Observable<HTMLElement>
  >();
  private readonly _iconRegistryService = inject(IconRegistryService);
  private readonly iconsByUrl = new Map<string, string>();
  private readonly http = inject(HttpClient);
  private readonly _domParser = createDomParser();
  private readonly _iconLoader = new Map<
    string,
    Observable<HTMLElement | null>
  >();
  private readonly _iconCache = new Map<string, HTMLElement>();

  load(name: string) {
    const url = this._iconRegistryService.getUrl(name);

    if (!url) {
      throw new Error(
        `Icon with name ${name} not found. Please use IconRegistryService.addSvgIcon() to add it.`
      );
    }
    const cachedIcon = this._iconCache.get(url);

    if (cachedIcon) {
      return of(cachedIcon.cloneNode(true) as HTMLElement);
    }
    const iconIsLoading = this._iconLoader.get(url);
    if (iconIsLoading) {
      return iconIsLoading;
    }

    return this.fetch(url);
  }

  private fetch(url: string) {
    const http$ = this.http
      .get(url, {
        responseType: 'text',
      })
      .pipe(map((svg) => this.stringToSvg(svg)))
      .pipe(finalize(() => this._iconLoader.delete(url)));
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
