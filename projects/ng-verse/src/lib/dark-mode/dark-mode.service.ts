import { inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from 'ng-verse/local-storage/local-storage.service';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

const DARK_MODE_KEY = 'dark-mode';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private _darkMode = signal(false);

  darkMode = this._darkMode.asReadonly();

  private readonly localStorageService = inject(LocalStorageService);

  constructor() {
    const storedDarkMode = this.localStorageService.getItem(DARK_MODE_KEY);
    if (storedDarkMode) {
      this._darkMode.set(coerceBooleanProperty(storedDarkMode));
    }
  }

  setDarkMode(darkMode: boolean) {
    this._darkMode.set(darkMode);
    this.localStorageService.setItem(DARK_MODE_KEY, darkMode + '');
  }
}
