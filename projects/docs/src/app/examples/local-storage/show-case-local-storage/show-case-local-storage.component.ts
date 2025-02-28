import { ButtonComponent } from '@/ui/button/button.component';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { LocalStorageService } from '../../../../../../kit/src/local-storage/local-storage.service';
const STORAGE_KEY = 'current-date';

@Component({
  selector: 'doc-show-case-local-storage',
  imports: [ButtonComponent],
  templateUrl: './show-case-local-storage.component.html',
  styleUrl: './show-case-local-storage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCaseLocalStorageComponent implements OnDestroy {
  private localStorageService = inject(LocalStorageService);
  dateValue = signal<string | undefined>(undefined);

  store() {
    this.localStorageService.setItem(STORAGE_KEY, new Date().toString());
  }

  read() {
    const date = this.localStorageService.getItem(STORAGE_KEY);
    if (date) {
      this.dateValue.set(date);
    }
  }

  ngOnDestroy(): void {
    this.localStorageService.removeItem(STORAGE_KEY);
  }
}
