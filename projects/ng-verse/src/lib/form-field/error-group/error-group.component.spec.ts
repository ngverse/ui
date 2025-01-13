import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorGroupComponent } from './error-group.component';

xdescribe('ErrorGroupComponent', () => {
  let component: ErrorGroupComponent;
  let fixture: ComponentFixture<ErrorGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
