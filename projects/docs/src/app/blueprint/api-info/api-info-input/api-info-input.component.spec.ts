import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiInfoInputComponent } from './api-info-input.component';

describe('ApiInfoInputComponent', () => {
  let component: ApiInfoInputComponent;
  let fixture: ComponentFixture<ApiInfoInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiInfoInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiInfoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
