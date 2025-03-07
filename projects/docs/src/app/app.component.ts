import { IconRegistry } from '@/ui/icon/icon.registry';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/header/header.component';

@Component({
  selector: 'doc-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  iconRegistry = inject(IconRegistry);

  constructor() {
    this.iconRegistry.addIcon('github', 'images/github.svg');
    this.iconRegistry.addIcon('logo', 'logo.svg');
  }
}
