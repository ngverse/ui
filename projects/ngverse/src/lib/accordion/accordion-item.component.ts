import { _IdGenerator } from '@angular/cdk/a11y';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { matExpandMore } from '@ng-icons/material-icons/baseline';
import {
  COLLAPSE_ON_LEAVE,
  EXPAND_ON_ENTER_ANIMATION,
} from './accordion-animations';

@Component({
  selector: 'app-accordion-item',
  imports: [NgIcon],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.css',
  animations: [EXPAND_ON_ENTER_ANIMATION, COLLAPSE_ON_LEAVE],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block mb-3 pb-3 border-b border-divider',
  },
})
export class AccordionItemComponent extends CdkAccordionItem {
  label = input<string>();
  accordionBodyId = inject(_IdGenerator).getId('accordion-item-body-');
  accordionTriggerId = inject(_IdGenerator).getId('accordion-item-trigger-');
  EXPAND_ICON = matExpandMore;
}
