import {
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import { MultiSelectCheckIconComponent } from "../multi-select-check.component";
import { MultiSelectState } from '@ng-verse/multi-select/multi-select.state';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: 'app-multi-select-item',
  imports: [MultiSelectCheckIconComponent],
  templateUrl: './multi-select-item.component.html',
  styleUrl: './multi-select-item.component.scss',
  host: {
    '(click)': 'onSelect()',
    '[class.selected]': 'selected()',
    '[class.focused]': 'focused()',
    '[attr.role]': '"listitem"'
  }
})
export class MultiSelectItemComponent implements OnInit, OnDestroy, Highlightable {
  value = input.required<unknown>();
  selected = signal(false);
  focused = signal(false);

  private readonly el = inject(ElementRef);

  private readonly multiSelectState = inject(MultiSelectState);

  ngOnInit() {
    this.multiSelectState.add(this);
  }

  ngOnDestroy() {
    this.multiSelectState.remove(this);
  }

  innerText() {
    return this.el.nativeElement.innerText ?? '';
  }

  onSelect() {
   this.multiSelectState.toggle(this);
  }

  setActiveStyles(): void {
    this.focused.set(true)
  }

  setInactiveStyles(): void {
    this.focused.set(false)
  }

  scrollIntoView() {
    this.el?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
