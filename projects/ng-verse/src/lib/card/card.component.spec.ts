import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardContentComponent } from './card-content/card-content.component';
import { CardDescriptionComponent } from './card-description/card-description.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardTitleComponent } from './card-title/card-title.component';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let fixture: ComponentFixture<CardTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardTestComponent);
  });
  it('should display all passed components', () => {
    expect(fixture.nativeElement.querySelector('app-card-header')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-card-title')).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('app-card-description')
    ).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('app-card-content')
    ).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-card-footer')).toBeTruthy();
  });
});
@Component({
  template: `
    <app-card>
      <app-card-header>
        <app-card-title>Title</app-card-title>
        <app-card-description>Description</app-card-description>
      </app-card-header>
      <app-card-content>Body</app-card-content>
      <app-card-footer>Footer</app-card-footer>
    </app-card>
  `,
  imports: [
    CardComponent,
    CardContentComponent,
    CardDescriptionComponent,
    CardFooterComponent,
    CardHeaderComponent,
    CardTitleComponent,
  ],
  selector: 'app-card-test',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CardTestComponent {}
