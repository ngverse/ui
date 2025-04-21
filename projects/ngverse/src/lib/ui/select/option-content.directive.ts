import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appOptionContent]',
})
export class OptionContentDirective {
  private _element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  get content() {
    return this._element.textContent;
  }
}
