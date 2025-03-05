import { CdkAccordion } from '@angular/cdk/accordion';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent extends CdkAccordion {}
