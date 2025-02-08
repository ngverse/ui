import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, computed, input, signal } from '@angular/core';
import { IconComponent } from '@ng-verse/icon/icon.component';
import { CardComponent } from 'ng-verse/card/card.component';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'doc-source-code',
  imports: [Highlight, ClipboardModule, IconComponent, CardComponent],
  templateUrl: './source-code.component.html',
  styleUrl: './source-code.component.scss',
})
export class SourceCodeComponent {
  code = input.required<string>();
  language = input.required<string>();

  allowCopy = input(true);

  copied = signal(false);

  outline = input(true);

  surface = input(false);

  showCopy = computed(() => this.allowCopy() && !!this.code());

  copy() {
    this.copied.set(true);
    setTimeout(() => {
      this.copied.set(false);
    }, 2000);
  }
}
