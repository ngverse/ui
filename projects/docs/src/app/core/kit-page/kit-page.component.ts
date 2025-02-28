import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
  activeSection = signal('Overview');
  name = input.required<string>();
  description = input.required<string>();

  showExamples = input(false);

  filteredSections = computed(() => {
    if (this.showExamples()) {
      return ['Overview', 'API', 'Examples'];
    }
    return ['Overview', 'API'];
  });

  setSection(section: string) {
    this.activeSection.set(section);
  }
}
