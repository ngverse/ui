import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'doc-kit-page',
  templateUrl: './kit-page.component.html',
  styleUrl: './kit-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitPageComponent {
  sections = ['Overview', 'API', 'Examples'];
  activeSection = signal('API');
  name = input.required<string>();
  description = input.required<string>();

  setSection(section: string) {
    this.activeSection.set(section);
  }
}
