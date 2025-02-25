import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { LabelComponent } from './label.component';

describe('LabelComponent', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelTestComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelTestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display label content', () => {
    expect(fixture.nativeElement.textContent).toContain('I am Label');
  });
});

@Component({
  imports: [LabelComponent],
  template: ` <app-label> I am Label </app-label> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelTestComponent {}
