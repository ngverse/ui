import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationPrevComponent } from './pagination-prev.component';

describe('PaginationPrevComponent', () => {
  let component: PaginationPrevComponent;
  let fixture: ComponentFixture<PaginationPrevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationPrevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationPrevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
