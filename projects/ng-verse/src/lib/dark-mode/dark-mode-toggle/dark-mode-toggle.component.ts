import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DarkModeService } from 'ng-verse/dark-mode/dark-mode.service';
import { DarkModeIconComponent } from 'ng-verse/dark-mode/dark-mode-icon.component';
import { LightModeIconComponent } from 'ng-verse/dark-mode/light-mode-icon.component';

@Component({
  selector: 'app-dark-mode-toggle',
  imports: [DarkModeIconComponent, LightModeIconComponent],
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
