import { AutocompleteItemComponent } from '@/ui/autocomplete/autocomplete-item/autocomplete-item.component';
import { AutocompleteComponent } from '@/ui/autocomplete/autocomplete.component';
import { Component, computed, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'doc-show-case-autocomplete',
  imports: [AutocompleteComponent, AutocompleteItemComponent, FormsModule],
  templateUrl: './show-case-autocomplete.component.html',
  styleUrl: './show-case-autocomplete.component.css',
})
export class ShowCaseAutocompleteComponent {
  readonly items = ['Angular', 'React', 'Vue', 'Svelte', 'Next.js'];

  currentFilter = model('');

  filteredItems = computed(() => {
    return this.items.filter((item) =>
      item.toLowerCase().includes(this.currentFilter().toLowerCase())
    );
  });
}
