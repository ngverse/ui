import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';

function mockLocalStorage(): Storage {
  return {
    length: 0,
    key: () => null,
    getItem: () => null,
    setItem: () => null,
    removeItem: () => null,
    clear: () => null,
  };
}

export const LOCAL_STORAGE_TOKEN = new InjectionToken<Storage>(
  'LOCAL_STORAGE_TOKEN',
  {
    factory: () => {
      const platformId = inject(PLATFORM_ID);
      const isBrowser = isPlatformBrowser(platformId);
      const document = inject(DOCUMENT);

      if (isBrowser) {
        return document.defaultView?.localStorage ?? mockLocalStorage();
      } else {
        return mockLocalStorage();
      }
    },
  }
);

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements Storage {
  private _storage = inject(LOCAL_STORAGE_TOKEN);

  readonly enabled = isPlatformBrowser(inject(PLATFORM_ID));

  get length() {
    return this._storage.length;
  }

  clear() {
    this._storage.clear();
  }
  getItem(key: string) {
    return this._storage.getItem(key);
  }
  key(index: number) {
    return this._storage.key(index);
  }
  removeItem(key: string): void {
    this._storage.removeItem(key);
  }
  setItem(key: string, value: string): void {
    this._storage.setItem(key, value);
  }
}
