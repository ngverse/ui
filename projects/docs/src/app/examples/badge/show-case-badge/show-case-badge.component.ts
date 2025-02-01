import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BadgeComponent } from '@ngverse/badge/badge.component';
import { ButtonComponent } from '@ngverse/button/button.component';

@Component({
  selector: 'doc-show-case-badge',
  imports: [FormsModule, ButtonComponent, BadgeComponent],
  templateUrl: './show-case-badge.component.html',
  styleUrl: './show-case-badge.component.scss',
})
export class ShowCaseBadgeComponent {
  count = signal(8);
  decreese() {
    if (!this.count()) {
      return;
    }

    this.count.update((c) => c - 1);
  }
}
