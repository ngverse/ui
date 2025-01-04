import { Component, model } from '@angular/core';
import { CardComponent } from '@ng-verse/card/card.component';
import { CardHeaderComponent } from '@ng-verse/card/card-header/card-header.component';
import { CardTitleComponent } from '@ng-verse/card/card-title/card-title.component';
import { CardDescriptionComponent } from '@ng-verse/card/card-description/card-description.component';
import { CardContentComponent } from '@ng-verse/card/card-content/card-content.component';
import { CardFooterComponent } from '@ng-verse/card/card-footer/card-footer.component';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '@ng-verse/input/input.component';

@Component({
  selector: 'doc-show-case-card',
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    CardFooterComponent,
    ButtonComponent,
    FormsModule,
    InputComponent
  ],
  templateUrl: './show-case-card.component.html',
  styleUrl: './show-case-card.component.scss',
})
export class ShowCaseCardComponent {
  username = model('');
  password = model('');
}
