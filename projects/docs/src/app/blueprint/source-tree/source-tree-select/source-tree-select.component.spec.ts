import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceTreeSelectComponent } from './source-tree-select.component';

describe('SourceTreeSelectComponent', () => {
  let component: SourceTreeSelectComponent;
  let fixture: ComponentFixture<SourceTreeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourceTreeSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceTreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
