import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationFirstComponent } from './pagination-first.component';

describe('PaginationFirstComponent', () => {
  let component: PaginationFirstComponent;
  let fixture: ComponentFixture<PaginationFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationFirstComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
