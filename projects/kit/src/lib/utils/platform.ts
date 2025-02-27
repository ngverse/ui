import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GnPlatform {
  private _platformId = inject(PLATFORM_ID);

  // We want to use the Angular platform check because if the Document is shimmed
  // without the navigator, the following checks will fail. This is preferred because
  // sometimes the Document may be shimmed without the user's knowledge or intention
  /** Whether the Angular application is being rendered in the browser. */
  isBrowser: boolean = this._platformId
    ? isPlatformBrowser(this._platformId)
    : typeof document === 'object' && !!document;

  /** Whether the current browser is Microsoft Edge. */
  EDGE: boolean = this.isBrowser && /(edge)/i.test(navigator.userAgent);

  /** Whether the current rendering engine is Microsoft Trident. */
  TRIDENT: boolean =
    this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);

  /** Whether the current platform is Apple iOS. */
  IOS: boolean =
    this.isBrowser &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !('MSStream' in window);

  // It's difficult to detect the plain Gecko engine, because most of the browsers identify
  // them self as Gecko-like browsers and modify the userAgent's according to that.
  // Since we only cover one explicit Firefox case, we can simply check for Firefox
  // instead of having an unstable check for Gecko.
  /** Whether the current browser is Firefox. */
  FIREFOX: boolean =
    this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);

  /** Whether the current platform is Android. */
  // Trident on mobile adds the android platform to the userAgent to trick detections.
  ANDROID: boolean =
    this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;

  IS_SERVER = isPlatformServer(inject(PLATFORM_ID));
}
