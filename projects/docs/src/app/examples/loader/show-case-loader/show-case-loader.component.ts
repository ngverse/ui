import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonComponent } from '../../../../../../ngverse/src/lib/ui/button/button.component';
import { CardComponent } from '../../../../../../ngverse/src/lib/ui/card/card.component';
import { FormFieldComponent } from '../../../../../../ngverse/src/lib/ui/form-field/form-field.component';
import { InputDirective } from '../../../../../../ngverse/src/lib/ui/input/input.directive';
import { LoaderComponent } from '../../../../../../ngverse/src/lib/ui/loader/loader.component';

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
