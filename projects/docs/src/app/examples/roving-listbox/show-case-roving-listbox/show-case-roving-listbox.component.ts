import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RovingListboxItemDirective } from '@ng-verse/roving-listbox/roving-listbox-item.directive';
import { RovingListboxDirective } from '@ng-verse/roving-listbox/roving-listbox.directive';

@Component({
  selector: 'doc-show-case-roving-listbox',
  imports: [RovingListboxDirective, RovingListboxItemDirective],
  templateUrl: './show-case-roving-listbox.component.html',
  styleUrl: './show-case-roving-listbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCaseRovingListboxComponent {}
