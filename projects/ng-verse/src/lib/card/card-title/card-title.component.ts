import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-title',
  imports: [],
  templateUrl: './card-title.component.html',
  styleUrl: './card-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTitleComponent {}
