import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconRegistryService } from '@ng-verse/icon/icon-registry.service';
import { HeaderComponent } from './features/header/header.component';

@Component({
  selector: 'doc-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  iconRegistry = inject(IconRegistryService);

  constructor() {
    this.iconRegistry.addIcon('copy', 'images/copy.svg');
    this.iconRegistry.addIcon('check', 'images/check.svg');
  }
}
