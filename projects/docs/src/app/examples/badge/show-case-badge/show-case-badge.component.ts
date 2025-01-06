import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BadgeDirective } from '@ng-verse/badge/badge.directive';
import { ButtonComponent } from '@ng-verse/button/button.component';

@Component({
  selector: 'doc-show-case-badge',
  imports: [BadgeDirective, FormsModule, ButtonComponent],
  templateUrl: './show-case-badge.component.html',
  styleUrl: './show-case-badge.component.scss',
})
export class ShowCaseBadgeComponent {
  count = signal(5);
  decreese() {
    if (!this.count()) {
      return;
    }

    this.count.update((c) => c - 1);
  }
}
