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
  A11yTabStack,
} from '@ngverse/kit';

@Component({
  selector: 'doc-kit-page',
  templateUrl: './kit-page.component.html',
  styleUrl: './kit-page.component.css',
  imports: [A11yTabListDirective, A11yTabDirective],
  hostDirectives: [A11yTabGroupDirective],
  providers: [A11yTabStack],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitPageComponent {
  sections = ['Overview', 'API', 'Examples'];
  activeSection = signal(this.sections[0]);
  name = input.required<string>();
  description = input.required<string>();

  showExamples = input(false);

  filteredSections = computed(() => {
    if (this.showExamples()) {
      return this.sections;
    }
    return this.sections.slice(0, 2);
  });

  setSection(section: string) {
    this.activeSection.set(section);
  }
}
