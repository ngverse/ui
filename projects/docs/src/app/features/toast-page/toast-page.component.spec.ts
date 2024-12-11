import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastPageComponent } from './toast-page.component';

describe('ToastPageComponent', () => {
  let component: ToastPageComponent;
  let fixture: ComponentFixture<ToastPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
