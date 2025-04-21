import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[appSelectLabel]',
})
export class SelectLabelDirective {
  ref = inject(TemplateRef);
}
