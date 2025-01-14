import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionGroupComponent } from './option-group.component';

describe('OptionGroupComponent', () => {
  let component: OptionGroupComponent;
  let fixture: ComponentFixture<OptionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionGroupComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
