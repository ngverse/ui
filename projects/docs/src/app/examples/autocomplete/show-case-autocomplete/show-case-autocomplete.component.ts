import { Component, computed, model, signal } from '@angular/core';
import { AutocompleteComponent } from '@ng-verse/autocomplete/autocomplete.component';
import { AutocompleteItemComponent } from '@ng-verse/autocomplete/autocomplete-item/autocomplete-item.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'doc-show-case-autocomplete',
  imports: [AutocompleteComponent, AutocompleteItemComponent, FormsModule],
  templateUrl: './show-case-autocomplete.component.html',
  styleUrl: './show-case-autocomplete.component.scss',
})
export class ShowCaseAutocompleteComponent {
  readonly items = ['Angular', 'React', 'Vue', 'Svelte', 'Next.js'];

  currentFilter = model('');

  filteredItems = computed(() => {
    return this.items.filter(item => item.toLowerCase().includes(this.currentFilter().toLowerCase()));
  });
}
