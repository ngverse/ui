import { Component, model, signal } from '@angular/core';
import { MultiSelectComponent } from '@ng-verse/multi-select/multi-select.component';
import { MultiSelectItemComponent } from '@ng-verse/multi-select/multi-select-item/multi-select-item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'doc-show-case-multi-select',
  imports: [MultiSelectComponent, MultiSelectItemComponent, FormsModule],
  templateUrl: './show-case-multi-select.component.html',
  styleUrl: './show-case-multi-select.component.scss',
})
export class ShowCaseMultiSelectComponent {
  selectedOption = model(['option2'])

  options = signal(Array.from({ length: 50 }, (_, i) => ({
    label: `Option ${i + 1}`,
    value: `option${i + 1}`,
  })))
}
