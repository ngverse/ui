import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDescriptionComponent } from './alert-description.component';

describe('AlertDescriptionComponent', () => {
  let component: AlertDescriptionComponent;
  let fixture: ComponentFixture<AlertDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
