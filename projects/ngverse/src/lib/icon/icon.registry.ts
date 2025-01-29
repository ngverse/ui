import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IconRegistry {
  private readonly icons = new Map<string, string>();

  addIcon(name: string, url: string) {
    this.icons.set(name, url);
  }

  getUrl(name: string) {
    return this.icons.get(name);
  }
}
