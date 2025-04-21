import { FontIconComponent } from '@/ui/font-icon/font-icon.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'doc-show-case-font-icon',
  imports: [FontIconComponent],
  templateUrl: './show-case-font-icon.component.html',
  styleUrl: './show-case-font-icon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCaseFontIconComponent {}
