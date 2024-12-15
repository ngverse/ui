import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCaseToastComponent } from './show-case-toast.component';

describe('ShowCaseToastComponent', () => {
  let component: ShowCaseToastComponent;
  let fixture: ComponentFixture<ShowCaseToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCaseToastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCaseToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
