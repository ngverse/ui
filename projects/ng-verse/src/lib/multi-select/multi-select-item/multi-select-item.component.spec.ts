import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectItemComponent } from './multi-select-item.component';
import { MultiSelectState } from '@ng-verse/multi-select/multi-select.state';

describe('MultiSelectItemComponent', () => {
  let component: MultiSelectItemComponent;
  let fixture: ComponentFixture<MultiSelectItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectItemComponent],
      providers: [MultiSelectState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
