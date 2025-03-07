import { ButtonComponent } from '@/ui/button/button.component';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { matDarkMode, matLightMode } from '@ng-icons/material-icons/baseline';
import { DarkModeService } from './dark-mode.service';

@Component({
  selector: 'app-dark-mode-toggle',
  imports: [ButtonComponent, NgIcon],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DarkModeToggleComponent {
  private readonly darkModeService = inject(DarkModeService);
  isEnabled = this.darkModeService.isEnabled;

  LIGHT_MODE = matLightMode;
  DARK_MODE = matDarkMode;

  toggleDarkMode() {
    this.darkModeService.toggle();
  }
}
