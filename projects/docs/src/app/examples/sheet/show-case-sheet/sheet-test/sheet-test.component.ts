import { Component, inject, input } from '@angular/core';
import { SheetRef } from '@ng-verse/sheet/sheet-ref';
import { ButtonComponent } from '@ng-verse/button/button.component';
@Component({
  selector: 'doc-sheet-test',
  imports: [
    ButtonComponent
  ],
  templateUrl: './sheet-test.component.html',
  styleUrl: './sheet-test.component.scss'
})
export class SheetTestComponent {
  name = input();

  private readonly sheetRef = inject(SheetRef);

  close () {
    this.sheetRef.close();
  }
}
