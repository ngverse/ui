import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiInputsComponent } from './api-inputs.component';

describe('ApiInputsComponent', () => {
  let component: ApiInputsComponent;
  let fixture: ComponentFixture<ApiInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiInputsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
