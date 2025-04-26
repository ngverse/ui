import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[appMultiSelectLabel]',
})
export class MultiSelectLabelDirective {
  ref = inject(TemplateRef);
}
