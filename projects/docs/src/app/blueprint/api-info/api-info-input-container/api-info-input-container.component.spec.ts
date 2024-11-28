import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiInfoInputContainerComponent } from './api-info-input-container.component';

describe('ApiInfoInputContainerComponent', () => {
  let component: ApiInfoInputContainerComponent;
  let fixture: ComponentFixture<ApiInfoInputContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiInfoInputContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiInfoInputContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
