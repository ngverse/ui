import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonComponent } from '../../../../../../ngverse/src/lib/button/button.component';
import { CardComponent } from '../../../../../../ngverse/src/lib/card/card.component';
import { FormFieldComponent } from '../../../../../../ngverse/src/lib/form-field/form-field.component';
import { InputDirective } from '../../../../../../ngverse/src/lib/input/input.directive';
import { LoaderComponent } from '../../../../../../ngverse/src/lib/loader/loader.component';

@Component({
  selector: 'doc-show-case-loader',
  imports: [
    LoaderComponent,
    ButtonComponent,
    FormFieldComponent,
    InputDirective,
    ButtonComponent,
    CardComponent,
  ],
  templateUrl: './show-case-loader.component.html',
  styleUrl: './show-case-loader.component.css',
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
