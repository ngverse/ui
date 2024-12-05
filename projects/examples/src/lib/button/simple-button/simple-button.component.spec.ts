import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleButtonComponent } from './simple-button.component';

describe('SimpleButtonComponent', () => {
  let component: SimpleButtonComponent;
  let fixture: ComponentFixture<SimpleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
