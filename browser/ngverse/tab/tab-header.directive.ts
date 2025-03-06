import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[appTabHeader]',
})
export class TabHeaderDirective {
  templateRef = inject(TemplateRef<unknown>);
}
