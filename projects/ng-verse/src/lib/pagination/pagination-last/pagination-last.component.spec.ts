import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationLastComponent } from './pagination-last.component';

describe('PaginationLastComponent', () => {
  let component: PaginationLastComponent;
  let fixture: ComponentFixture<PaginationLastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationLastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
