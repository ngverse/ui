import { Component, inject } from '@angular/core';
import { SheetService } from '@ng-verse/sheet/sheet.service';
import { SheetTestComponent } from './sheet-test/sheet-test.component';

@Component({
  selector: 'doc-show-case-sheet',
  templateUrl: './show-case-sheet.component.html',
  styleUrl: './show-case-sheet.component.scss',
})
export class ShowCaseSheetComponent {
  private readonly sheetService = inject(SheetService)

  openSheet() {
    this.sheetService.open(SheetTestComponent, {name: 'Nikolay'});
  }
}
