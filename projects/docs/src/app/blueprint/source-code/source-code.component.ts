import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, computed, input, signal } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { CardComponent } from '../../../../../ng-verse/src/lib/card/card.component';
import { CheckIconComponent } from '../../icons/check-icon.component';
import { CopyIconComponent } from '../../icons/copy-icon.component';
import { EMPTY_FILE_TOKEN } from '../../services/file.service';

@Component({
  selector: 'doc-source-code',
  imports: [
    Highlight,
    ClipboardModule,
    CopyIconComponent,
    CheckIconComponent,
    CardComponent,
  ],
  templateUrl: './source-code.component.html',
  styleUrl: './source-code.component.scss',
})
export class SourceCodeComponent {
  code = input.required<string>();
  language = input.required<string>();

  copied = signal(false);

  outline = input(true);

  showCopy = computed(() => this.code() !== EMPTY_FILE_TOKEN);

  copy() {
    this.copied.set(true);
    setTimeout(() => {
      this.copied.set(false);
    }, 2000);
  }
}
