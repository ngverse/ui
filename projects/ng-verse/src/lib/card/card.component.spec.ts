import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { CardContentComponent } from './card-content/card-content.component';
import { CardDescriptionComponent } from './card-description/card-description.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardTitleComponent } from './card-title/card-title.component';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardTestComponent;
  let fixture: ComponentFixture<CardTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should display the card's header", () => {
    const header = fixture.nativeElement.querySelector('app-card-header');
    expect(header.textContent).toContain('Card Title');
  });
  it("should display the card's title", () => {
    const title = fixture.nativeElement.querySelector('app-card-title');
    expect(title.textContent).toBe('Card Title');
  });
  it("should display the card's description", () => {
    const description = fixture.nativeElement.querySelector(
      'app-card-description'
    );
    expect(description.textContent).toBe('Card Description');
  });
  it("should display the card's content", () => {
    const content = fixture.nativeElement.querySelector('app-card-content');
    expect(content.textContent).toBe('Card Content');
  });
  it('should display the card footer', () => {
    const footer = fixture.nativeElement.querySelector('app-card-footer');
    expect(footer.textContent).toBe('Card Footer');
  });
});

@Component({
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    CardFooterComponent,
  ],
  template: `<app-card class="card">
    <app-card-header>
      <app-card-title>Card Title</app-card-title>
      <app-card-description>Card Description</app-card-description>
    </app-card-header>
    <app-card-content class="card-content">
      <p>Card Content</p>
    </app-card-content>
    <app-card-footer class="card-footer">
      <p>Card Footer</p>
    </app-card-footer>
  </app-card> `,
})
class CardTestComponent {}
