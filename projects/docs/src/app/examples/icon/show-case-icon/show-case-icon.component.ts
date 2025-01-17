import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconRegistryService } from '@ng-verse/icon/icon-registry.service';
import { IconComponent } from '@ng-verse/icon/icon.component';

@Component({
  selector: 'doc-show-case-icon',
  imports: [IconComponent, FormsModule],
  templateUrl: './show-case-icon.component.html',
  styleUrl: './show-case-icon.component.scss',
})
export class ShowCaseIconComponent {
  iconRegistryService = inject(IconRegistryService);
  icons = ['bird', 'cat', 'heart', 'paw', 'squirrel', 'volleyball'];
  size = model<number>(20);
  color = model<string>('#00000');

  constructor() {
    for (const icon of this.icons) {
      this.iconRegistryService.addIcon(icon, `/show-case-icon/${icon}.svg`);
    }
  }
}
