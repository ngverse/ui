import { Component, input } from '@angular/core';

@Component({
  selector: 'doc-blueprint-page',
  templateUrl: './blueprint-page.component.html',
  styleUrl: './blueprint-page.component.scss',
})
export class BlueprintPageComponent {
  label = input.required<string>();
  subTitle = input<string>();
}
