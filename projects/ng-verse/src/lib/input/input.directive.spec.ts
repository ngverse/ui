import { TestBed } from '@angular/core/testing';

import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { InputDirective } from './input.directive';

describe('InputComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDirective],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    expect(new InputDirective()).toBeTruthy();
  });
});
