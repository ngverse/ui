import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationNumbersComponent } from './pagination-numbers.component';

xdescribe('PaginationNumbersComponent', () => {
  let component: PaginationNumbersComponent;
  let fixture: ComponentFixture<PaginationNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationNumbersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
