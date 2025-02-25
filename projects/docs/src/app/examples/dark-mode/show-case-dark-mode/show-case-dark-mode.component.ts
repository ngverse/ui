import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DarkModeToggleComponent } from '../../../../../../ngverse/src/lib/ui/dark-mode/dark-mode-toggle.component';
import { DarkModeService } from '../../../../../../ngverse/src/lib/ui/dark-mode/dark-mode.service';

@Component({
  selector: 'doc-show-case-dark-mode',
  imports: [DarkModeToggleComponent],
  templateUrl: './show-case-dark-mode.component.html',
  styleUrl: './show-case-dark-mode.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCaseDarkModeComponent {
  private readonly darkModeService = inject(DarkModeService);

  isDarkMode = this.darkModeService.isEnabled;
}
