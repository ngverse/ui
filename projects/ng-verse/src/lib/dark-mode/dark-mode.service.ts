import { inject, Injectable, RendererFactory2, signal } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { DOCUMENT } from '@angular/common';

const DARK_MODE_STORAGE_KEY = 'dark-mode';
const DARK_MODE_ATTRIBUTE = 'data-dark-mode';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private _darkMode = signal(false);

  darkMode = this._darkMode.asReadonly();

  private readonly localStorageService = inject(LocalStorageService);
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(RendererFactory2).createRenderer(
    null,
    null
  );
  private readonly rootHtml = this.document.documentElement;
  private readonly window = this.document.defaultView;

  constructor() {
    this.initialize();
  }

  setDarkMode(darkMode: boolean) {
    this._darkMode.set(darkMode);
    this.localStorageService.setItem(DARK_MODE_STORAGE_KEY, darkMode + '');
    this.setHtmlDarkModeAttribute(darkMode);
  }

  private setHtmlDarkModeAttribute(darkMode: boolean) {
    this.renderer.setAttribute(
      this.rootHtml,
      DARK_MODE_ATTRIBUTE,
      darkMode ? 'true' : 'false'
    );
  }

  private initialize() {
    const storedDarkMode = this.localStorageService.getItem(
      DARK_MODE_STORAGE_KEY
    );
    if (storedDarkMode) {
      this._darkMode.set(coerceBooleanProperty(storedDarkMode));
    } else if (
      this.window?.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this._darkMode.set(true);
    }

    this.setHtmlDarkModeAttribute(this.darkMode());
  }
}
