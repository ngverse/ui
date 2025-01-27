import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { CardComponent } from '@ng-verse/card/card.component';
import { FormFieldComponent } from '@ng-verse/form-field/form-field.component';
import { InputComponent } from '@ng-verse/input/input.component';
import { LoaderComponent } from '@ng-verse/loader/loader.component';

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
