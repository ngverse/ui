import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetBodyComponent } from './sheet-body.component';

describe('SheetBodyComponent', () => {
  let component: SheetBodyComponent;
  let fixture: ComponentFixture<SheetBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
