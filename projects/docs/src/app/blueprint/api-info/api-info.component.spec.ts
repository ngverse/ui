import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiInfoComponent } from './api-info.component';

describe('ApiInfoComponent', () => {
  let component: ApiInfoComponent;
  let fixture: ComponentFixture<ApiInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
