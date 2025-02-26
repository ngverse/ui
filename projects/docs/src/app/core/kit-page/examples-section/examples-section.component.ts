import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'doc-examples-section',
  imports: [],
  templateUrl: './examples-section.component.html',
  styleUrl: './examples-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesSectionComponent {}
