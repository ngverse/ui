import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

const DARK_MODE_STORAGE_KEY = 'dark-mode';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private _darkMode = signal(false);

  enabled = this._darkMode.asReadonly();

  private readonly platform = inject(Platform);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly document = inject(DOCUMENT);

  private readonly rootHtml = this.document.documentElement;
  private readonly window = this.document.defaultView;

  constructor() {
    this.initialize();

    effect(() => {
      const darkMode = this._darkMode();
      this.localStorageService.setItem(DARK_MODE_STORAGE_KEY, darkMode + '');
      this.setHtmlDarkModeAttribute(darkMode);
    });
  }

  toggle() {
    this._darkMode.update((darkMode) => !darkMode);
  }

  enable() {
    this._darkMode.set(true);
  }
  disable() {
    this._darkMode.set(false);
  }

  private setHtmlDarkModeAttribute(darkMode: boolean) {
    if (darkMode) {
      this.rootHtml.classList.add('dark');
    } else {
      this.rootHtml.classList.remove('dark');
    }
  }

  private initialize() {
    if (this.localStorageService.enabled) {
      const storedDarkMode = this.localStorageService.getItem(
        DARK_MODE_STORAGE_KEY
      );

      if (storedDarkMode) {
        this._darkMode.set(coerceBooleanProperty(storedDarkMode));
        return;
      }
      if (
        this.platform.isBrowser &&
        this.window?.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        this._darkMode.set(true);
        return;
      }

      this._darkMode.set(false);
    }
  }
}
