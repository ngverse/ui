import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
  TemplateRef,
  viewChild,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'doc-tab-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabItemComponent {
  label = input.required<string>();
  content = viewChild(TemplateRef<unknown>);
}
