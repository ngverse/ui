import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpInputPageComponent } from './otp-input-page.component';

describe('OtpInputPageComponent', () => {
  let component: OtpInputPageComponent;
  let fixture: ComponentFixture<OtpInputPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpInputPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpInputPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
