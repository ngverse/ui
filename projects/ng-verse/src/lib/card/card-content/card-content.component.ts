import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-content',
  imports: [],
  templateUrl: './card-content.component.html',
  styleUrl: './card-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContentComponent {}
