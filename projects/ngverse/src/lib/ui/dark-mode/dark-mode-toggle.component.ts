import { ButtonComponent } from '@/ui/button/button.component';
import { FontIconComponent } from '@/ui/font-icon/font-icon.component';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
