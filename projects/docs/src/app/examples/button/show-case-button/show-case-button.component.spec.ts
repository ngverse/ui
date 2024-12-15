import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCaseButtonComponent } from './show-case-button.component';

describe('ShowCaseButtonComponent', () => {
  let component: ShowCaseButtonComponent;
  let fixture: ComponentFixture<ShowCaseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCaseButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCaseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
