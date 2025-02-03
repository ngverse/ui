import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@ng-verse/icon/icon.component';
import {
  Clipboard,
  ClipboardPaste,
  LucideAngularModule,
  Rocket,
} from 'lucide-angular';

@Component({
  selector: 'doc-home-page',
  imports: [RouterLink, LucideAngularModule, IconComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  Clipboard = Clipboard;
  ClipboardPaste = ClipboardPaste;
  Rocket = Rocket;
  title = inject(Title);
  constructor() {
    this.title.setTitle('ng-verse');
  }
}
