import { ButtonComponent } from '@/ui/button/button.component';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FontIconComponent } from '../icon/font-icon.component';
import { DarkModeService } from './dark-mode.service';

@Component({
  selector: 'app-dark-mode-toggle',
  imports: [ButtonComponent, FontIconComponent],
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
