import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { TabBodyDirective } from './tab-body.directive';
import { TabHeaderDirective } from './tab-header.directive';

@Component({
  selector: 'app-tab',
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  label = input<string>();
  templateRef = viewChild(TemplateRef);
  vf = inject(ViewContainerRef);
  headerTemplate = contentChild(TabHeaderDirective);

  bodyTemplate = contentChild(TabBodyDirective);

  portal: TemplatePortal | undefined;

  disabled = input(false);

  headerTemplatePortal = computed(() => {
    const headerTemplate = this.headerTemplate();
    if (headerTemplate) {
      return new TemplatePortal(headerTemplate.templateRef, this.vf);
    }
    return undefined;
  });

  templatePortal = computed(() => {
    const bodyTemplateRef = this.bodyTemplate()?.templateRef;
    if (bodyTemplateRef) {
      this.portal = new TemplatePortal(bodyTemplateRef, this.vf);
      return this.portal;
    }
    return new TemplatePortal(
      this.templateRef() as TemplateRef<unknown>,
      this.vf
    );
  });
}
