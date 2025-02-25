import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { TEXTAREA_RESIZE_TYPES, TextareaDirective } from './textarea.directive';

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
  it('should apply app-textarea class', async () => {
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('textarea').classList).toContain(
      'app-textarea'
    );
  });
  it('should apply resize style', async () => {
    component.resize.set('vertical');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('textarea').style.resize).toBe(
      'vertical'
    );
  });
});

@Component({
  imports: [TextareaDirective],
  template: ` <textarea resize="vertical" appTextarea></textarea>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TextareaTestComponent {
  resize = signal<TEXTAREA_RESIZE_TYPES>('none');
}
