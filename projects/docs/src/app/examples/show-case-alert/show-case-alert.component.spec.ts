import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCaseAlertComponent } from './show-case-alert.component';

describe('ShowCaseAlertComponent', () => {
  let component: ShowCaseAlertComponent;
  let fixture: ComponentFixture<ShowCaseAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCaseAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCaseAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
