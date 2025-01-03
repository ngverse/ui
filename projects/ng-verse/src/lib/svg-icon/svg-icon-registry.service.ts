import { Injectable } from '@angular/core';

export interface SvgIconOptions {
  cache?: boolean
}

const SVG_ICON_DEFAULT_OPTIONS: SvgIconOptions = {cache: true};

@Injectable({
  providedIn: 'root'
})
export class SvgIconRegistryService {
  private readonly icons = new Map<string, { options: SvgIconOptions, url: string }>();

  addSvgIcon(iconName: string, url: string, options?: SvgIconOptions) {
    this.icons.set(iconName, {options: {...SVG_ICON_DEFAULT_OPTIONS, ...options}, url});
  }

  getSvgIcon(iconName: string) {
    return this.icons.get(iconName);
  }
}
