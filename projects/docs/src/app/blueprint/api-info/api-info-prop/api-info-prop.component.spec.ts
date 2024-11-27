import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiInfoPropComponent } from './api-info-prop.component';

describe('ApiInfoPropComponent', () => {
  let component: ApiInfoPropComponent;
  let fixture: ComponentFixture<ApiInfoPropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiInfoPropComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiInfoPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
