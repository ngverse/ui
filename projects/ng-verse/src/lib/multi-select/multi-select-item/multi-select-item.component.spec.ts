import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectItemComponent } from './multi-select-item.component';

describe('MultiSelectItemComponent', () => {
  let component: MultiSelectItemComponent;
  let fixture: ComponentFixture<MultiSelectItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
