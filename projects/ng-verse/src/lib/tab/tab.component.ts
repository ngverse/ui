import { TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  computed,
  contentChild,
  effect,
  inject,
  input,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { TabBodyDirective } from './tab-body.directive';

@Component({
  selector: 'app-tab',
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
})
export class TabComponent {
  label = input<string>();
  templateRef = viewChild(TemplateRef);
  vf = inject(ViewContainerRef);
  lazyLoad = computed(() => this.tabBody() !== undefined);
  preservedContent: TemplatePortal | undefined;

  templatePortal = computed(() => {
    if (this.preservedContent) {
      return this.preservedContent;
    }
    if (this.tabBody()) {
      this.preservedContent = new TemplatePortal(
        this.tabBody()?.templateRef as TemplateRef<unknown>,
        this.vf
      );
    } else {
      this.preservedContent = new TemplatePortal(
        this.templateRef() as TemplateRef<unknown>,
        this.vf
      );
    }

    return this.preservedContent;
  });
  tabBody = contentChild(TabBodyDirective);

  constructor() {
    effect(() => {
      console.log(this.tabBody());
    });
  }
}
