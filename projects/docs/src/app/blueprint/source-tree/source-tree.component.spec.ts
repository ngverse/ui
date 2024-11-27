import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceTreeComponent } from './source-tree.component';

describe('SourceTreeComponent', () => {
  let component: SourceTreeComponent;
  let fixture: ComponentFixture<SourceTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourceTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
