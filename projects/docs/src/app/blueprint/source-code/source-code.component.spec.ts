import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceCodeComponent } from './source-code.component';

describe('SourceCodeComponent', () => {
  let component: SourceCodeComponent;
  let fixture: ComponentFixture<SourceCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourceCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
