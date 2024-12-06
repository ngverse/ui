import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsideClickPageComponent } from './outside-click-page.component';

describe('OutsideClickPageComponent', () => {
  let component: OutsideClickPageComponent;
  let fixture: ComponentFixture<OutsideClickPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutsideClickPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutsideClickPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
