import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertBodyComponent } from './alert-body.component';

describe('AlertBodyComponent', () => {
  let component: AlertBodyComponent;
  let fixture: ComponentFixture<AlertBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertBodyComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertBodyComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
