import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { InputDirective } from './input.directive';

describe('InputComponent', () => {
  let fixture: ComponentFixture<InputTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDirective],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTestComponent);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

@Component({
  imports: [InputDirective],
  template: ` <input appInput />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class InputTestComponent {}
