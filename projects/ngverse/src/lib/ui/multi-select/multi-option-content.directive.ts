import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appMultiOptionContent]',
})
export class MultiOptionContentDirective {
  private _element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  get content() {
    return this._element.textContent;
  }
}
