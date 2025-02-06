import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DarkModeIconComponent } from './dark-mode-icon.component';
import { LightModeIconComponent } from './light-mode-icon.component';
import { IconButtonComponent } from '../../button/icon-button.component';
import { DarkModeService } from '../dark-mode.service';

@Component({
  selector: 'app-dark-mode-toggle',
  imports: [DarkModeIconComponent, LightModeIconComponent, IconButtonComponent],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DarkModeToggleComponent {
  private readonly darkModeService = inject(DarkModeService);
  darkMode = this.darkModeService.darkMode;

  toggleDarkMode() {
    this.darkModeService.setDarkMode(!this.darkMode());
  }
}
