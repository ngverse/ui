import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Clipboard,
  ClipboardPaste,
  LucideAngularModule,
  Rocket,
} from 'lucide-angular';

@Component({
  selector: 'doc-home-page',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  Clipboard = Clipboard;
  ClipboardPaste = ClipboardPaste;
  Rocket = Rocket;
}
