import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Component } from '@angular/core';
import { CardContentComponent } from '@ng-verse/card/card-content/card-content.component';
import { CardDescriptionComponent } from '@ng-verse/card/card-description/card-description.component';
import { CardFooterComponent } from '@ng-verse/card/card-footer/card-footer.component';
import { CardHeaderComponent } from '@ng-verse/card/card-header/card-header.component';
import { CardTitleComponent } from '@ng-verse/card/card-title/card-title.component';

describe('CardComponent', () => {
  let component: TestCardComponent;
  let fixture: ComponentFixture<TestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all passed components', () => {
    expect(fixture.nativeElement.querySelector('app-card-header')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-card-title')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-card-description')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-card-content')).toBeTruthy();
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
  selector: 'app-card-test'
})
class TestCardComponent {

}
