import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCaseOtpInputComponent } from './show-case-otp-input.component';

describe('ShowCaseOtpInputComponent', () => {
  let component: ShowCaseOtpInputComponent;
  let fixture: ComponentFixture<ShowCaseOtpInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCaseOtpInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCaseOtpInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
