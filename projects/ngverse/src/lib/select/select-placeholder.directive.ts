import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[appSelectPlaceholder]',
})
export class SelectPlaceholderDirective {
  templateRef = inject(TemplateRef<unknown>);
}
