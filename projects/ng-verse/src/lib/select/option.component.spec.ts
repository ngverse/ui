import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { OptionComponent } from './option.component';
import { SelectComponent } from './select.component';

describe('OptionComponent', () => {
  let component: OptionTestComponent;
  let fixture: ComponentFixture<OptionTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionTestComponent],
      providers: [SelectComponent, provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-test-option',
  imports: [SelectComponent, OptionComponent],
  template: `
    <app-select placeholder="Test">
      <app-option [value]="1">First Value</app-option>
    </app-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class OptionTestComponent {}
