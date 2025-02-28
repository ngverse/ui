import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import {
  A11yTabDirective,
  A11yTabGroupDirective,
  A11yTabListDirective,
} from '@ngverse/kit';

@Component({
  selector: 'doc-kit-page',
  templateUrl: './kit-page.component.html',
  styleUrl: './kit-page.component.css',
  imports: [A11yTabListDirective, A11yTabDirective],
  hostDirectives: [A11yTabGroupDirective],
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
