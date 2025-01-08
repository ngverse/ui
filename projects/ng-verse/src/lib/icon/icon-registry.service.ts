import { Injectable } from '@angular/core';

export interface IconOptions {
  cache?: boolean
}

const ICON_DEFAULT_OPTIONS: IconOptions = {cache: true};

@Injectable({
  providedIn: 'root'
})
export class IconRegistryService {
  private readonly icons = new Map<string, { options: IconOptions, url: string }>();

  addSvgIcon(iconName: string, url: string, options?: IconOptions) {
    this.icons.set(iconName, {options: {...ICON_DEFAULT_OPTIONS, ...options}, url});
  }

  getSvgIcon(iconName: string) {
    return this.icons.get(iconName);
  }
}
