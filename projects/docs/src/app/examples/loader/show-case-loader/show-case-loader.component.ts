import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonComponent } from 'ngverse/button/button.component';
import { CardComponent } from 'ngverse/card/card.component';
import { FormFieldComponent } from 'ngverse/form-field/form-field.component';
import { InputComponent } from 'ngverse/input/input.component';
import { LoaderComponent } from 'ngverse/loader/loader.component';

@Component({
  selector: 'doc-show-case-loader',
  imports: [
    LoaderComponent,
    ButtonComponent,
    FormFieldComponent,
    InputComponent,
    ButtonComponent,
    CardComponent,
  ],
  templateUrl: './show-case-loader.component.html',
  styleUrl: './show-case-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCaseLoaderComponent {
  showLoader = signal(false);

  show() {
    this.showLoader.set(true);
    setTimeout(() => {
      this.showLoader.set(false);
    }, 3000);
  }
}
