import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DarkModeIconComponent } from './dark-mode-icon.component';
import { DarkModeService } from './dark-mode.service';
import { ButtonComponent } from '@/ui/button/button.component';

@Component({
  selector: 'app-dark-mode-toggle',
  imports: [DarkModeIconComponent, ButtonComponent],
  templateUrl: './dark-mode-toggle.component.html',
  styleUrl: './dark-mode-toggle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DarkModeToggleComponent {
  private readonly darkModeService = inject(DarkModeService);
  isEnabled = this.darkModeService.isEnabled;

  toggleDarkMode() {
    this.darkModeService.toggle();
  }
}
