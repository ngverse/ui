import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartSelectorComponent } from './part-selector.component';

xdescribe('ValueSelectorComponent', () => {
  let component: PartSelectorComponent;
  let fixture: ComponentFixture<PartSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PartSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
