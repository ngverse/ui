import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconButtonComponent } from '../../button/icon-button.component';
import { DarkModeService } from '../dark-mode.service';
import { DarkModeIconComponent } from './dark-mode-icon.component';
import { LightModeIconComponent } from './light-mode-icon.component';

@Component({
  selector: 'app-dark-mode-toggle',
  imports: [DarkModeIconComponent, LightModeIconComponent, IconButtonComponent],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DarkModeToggleComponent {
  private readonly darkModeService = inject(DarkModeService);
  isDarkMode = this.darkModeService.isEnabled;

  toggleDarkMode() {
    this.darkModeService.toggle();
  }
}
