import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertBodyComponent } from './alert-body.component';

describe('AlertBodyComponent', () => {
  let component: AlertBodyComponent;
  let fixture: ComponentFixture<AlertBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertBodyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
