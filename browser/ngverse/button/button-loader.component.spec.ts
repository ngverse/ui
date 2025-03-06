import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ButtonLoaderComponent } from './button-loader.component';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonLoaderComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(ButtonLoaderComponent);
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });
});
