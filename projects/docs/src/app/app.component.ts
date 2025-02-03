import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconRegistry } from '@ng-verse/icon/icon.registry';
import { HeaderComponent } from './features/header/header.component';

@Component({
  selector: 'doc-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  iconRegistry = inject(IconRegistry);

  constructor() {
    this.iconRegistry.addIcon('copy', 'images/copy.svg');
    this.iconRegistry.addIcon('check', 'images/check.svg');
    this.iconRegistry.addIcon('arrow-right', 'images/arrow-right.svg');
    this.iconRegistry.addIcon('arrow-left', 'images/arrow-left.svg');
    this.iconRegistry.addIcon('clipboard', 'images/clipboard.svg');
    this.iconRegistry.addIcon('clipboard-paste', 'images/clipboard-paste.svg');
    this.iconRegistry.addIcon('rocket', 'images/rocket.svg');
  }
}
