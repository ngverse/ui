import { IconRegistry } from '@/ui/icon/icon.registry';
import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderComponent } from './features/header/header.component';

@Component({
  selector: 'doc-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  iconRegistry = inject(IconRegistry);
  private _document = inject(DOCUMENT);
  private _router = inject(Router);
  constructor() {
    this.iconRegistry.addIcon('github', 'images/github.svg');
    this.iconRegistry.addIcon('logo', 'logo.svg');

    this._router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        this._document.documentElement.scrollTop = 0;
      });
  }
}
