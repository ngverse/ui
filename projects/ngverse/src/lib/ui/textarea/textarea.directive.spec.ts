import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { TextareaDirective } from './textarea.directive';

describe('TextareaComponent', () => {
  let component: TextareaTestComponent;
  let fixture: ComponentFixture<TextareaTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaDirective],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaTestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  imports: [TextareaDirective],
  template: ` <textarea appTextarea></textarea>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TextareaTestComponent {}
