import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPageComponent } from './select-page.component';

describe('SelectPageComponent', () => {
  let component: SelectPageComponent;
  let fixture: ComponentFixture<SelectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
