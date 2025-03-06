import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
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
  styleUrl: './tab.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  label = input<string>();
  templateRef = viewChild(TemplateRef);
  vf = inject(ViewContainerRef);
  headerTemplate = contentChild(TabHeaderDirective);

  bodyTemplate = contentChild(TabBodyDirective);

  gap = input(true);

  portal: TemplatePortal | undefined;

  disabled = input(false);
}
