import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[appSelectLabel]',
})
export class SelectLabelDirective {
  templateRef = inject(TemplateRef<unknown>);
}
