import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonPageComponent } from './radio-button-page.component';

describe('RadioButtonPageComponent', () => {
  let component: RadioButtonPageComponent;
  let fixture: ComponentFixture<RadioButtonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioButtonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
