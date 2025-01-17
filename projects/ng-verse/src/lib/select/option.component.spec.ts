import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionComponent } from './option.component';
import { SelectState } from './select.state';

describe('OptionComponent', () => {
  let component: OptionComponent;
  let fixture: ComponentFixture<OptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionComponent],
      providers: [SelectState],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionComponent);
    fixture.componentRef.setInput('value', 'test');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
