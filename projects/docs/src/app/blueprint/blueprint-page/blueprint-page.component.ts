import { Component, input } from '@angular/core';
import { SeparateComponent } from "../separate/separate.component";

@Component({
  selector: 'doc-blueprint-page',
  imports: [SeparateComponent],
  templateUrl: './blueprint-page.component.html',
  styleUrl: './blueprint-page.component.scss',
})
export class BlueprintPageComponent {
  label = input.required<string>();
  subTitle = input<string>();
}
