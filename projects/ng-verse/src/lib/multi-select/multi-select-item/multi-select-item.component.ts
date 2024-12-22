import {
  afterRender,
  Component,
  contentChild,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  signal, viewChild
} from '@angular/core';
import { MultiSelectCheckIconComponent } from "../multi-select-check.component";
import { MultiSelectState } from '@ng-verse/multi-select/multi-select.state';

@Component({
  selector: 'app-multi-select-item',
  imports: [MultiSelectCheckIconComponent],
  templateUrl: './multi-select-item.component.html',
  styleUrl: './multi-select-item.component.scss',
  host: {
    '(click)': 'onSelect()',
    '[class.selected]': 'selected()'
  }
})
export class MultiSelectItemComponent implements OnInit, OnDestroy {
  value = input.required<unknown>();
  selected = signal(false);

  innerText = signal('');
  private readonly itemContent= viewChild<ElementRef<HTMLDivElement>>('itemContent');

  constructor() {
    afterRender({
      read: () => {
        this.innerText.set(this.itemContent()?.nativeElement.innerText ?? '');
      }
    } );
  }

  private readonly multiSelectState = inject(MultiSelectState);

  ngOnInit() {
    this.multiSelectState.add(this);
  }

  ngOnDestroy() {
    this.multiSelectState.remove(this);
  }

  onSelect() {
   this.multiSelectState.toggle(this);
  }
}
