import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCaseCheckboxComponent } from './show-case-checkbox.component';

describe('ShowCaseCheckboxComponent', () => {
  let component: ShowCaseCheckboxComponent;
  let fixture: ComponentFixture<ShowCaseCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCaseCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCaseCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
