import { Component } from '@angular/core';
import { BadgeDirective } from '@ng-verse/badge/badge.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'doc-show-case-badge',
  imports: [
    BadgeDirective,
    FormsModule,
  ],
  templateUrl: './show-case-badge.component.html',
  styleUrl: './show-case-badge.component.scss',
})
export class ShowCaseBadgeComponent {

}
