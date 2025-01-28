import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationNextComponent } from './pagination-next.component';

describe('PaginationNextComponent', () => {
  let component: PaginationNextComponent;
  let fixture: ComponentFixture<PaginationNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationNextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
