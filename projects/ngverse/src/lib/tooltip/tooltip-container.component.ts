import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-tooltip-container',
  imports: [CdkPortalOutlet, NgClass],
  templateUrl: './tooltip-container.component.html',
  styleUrl: './tooltip-container.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipContainerComponent {
  message = signal<string>('');

  position = signal<string>('top');

  content = signal<TemplateRef<unknown> | undefined>(undefined);
  vf = inject(ViewContainerRef);

  id = signal<string>('');

  contentPortal = computed(() => {
    const content = this.content();
    if (content) {
      return new TemplatePortal(content, this.vf);
    }
    return;
  });
}
