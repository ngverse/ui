import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { CardContentComponent } from '@ng-verse/card/card-content.component';
import { CardFooterComponent } from '@ng-verse/card/card-footer.component';
import { CardTitleComponent } from '@ng-verse/card/card-title.component';
import { CardComponent } from '@ng-verse/card/card.component';
import { InputComponent } from '@ng-verse/input/input.component';

@Component({
  selector: 'doc-show-case-card',
  imports: [
    CardComponent,
    CardTitleComponent,
    CardContentComponent,
    CardFooterComponent,
    ButtonComponent,
    FormsModule,
    InputComponent,
  ],
  templateUrl: './show-case-card.component.html',
  styleUrl: './show-case-card.component.scss',
})
export class ShowCaseCardComponent {
  username = model('');
  password = model('');
}
