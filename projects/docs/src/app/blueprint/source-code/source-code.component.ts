import { CardComponent } from '@/ui/card/card.component';
import { FontIconComponent } from '@/ui/icon/font-icon.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, computed, input, signal } from '@angular/core';
import { matCheck, matContentCopy } from '@ng-icons/material-icons/baseline';
import { Highlight } from 'ngx-highlightjs';
import { EMPTY_FILE_TOKEN } from '../../services/file.service';

@Component({
  selector: 'doc-source-code',
  imports: [Highlight, ClipboardModule, CardComponent, FontIconComponent],
  templateUrl: './source-code.component.html',
  styleUrl: './source-code.component.css',
})
export class SourceCodeComponent {
  code = input.required<string>();
  language = input.required<string>();

  allowCopy = input(true);

  copied = signal(false);

  outline = input(true);

  surface = input(false);

  COPY_ICON = matContentCopy;
  CHECK_ICON = matCheck;

  showCopy = computed(
    () => this.allowCopy() && !!this.code() && this.code() !== EMPTY_FILE_TOKEN
  );

  copy() {
    this.copied.set(true);
    setTimeout(() => {
      this.copied.set(false);
    }, 2000);
  }
}
