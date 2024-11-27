import { Component, input } from '@angular/core';

@Component({
  selector: 'doc-blueprint-page',
  imports: [],
  templateUrl: './blueprint-page.component.html',
  styleUrl: './blueprint-page.component.scss',
})
export class BlueprintPageComponent {
  title = input.required<string>();
  subTitle = input<string>();
}
