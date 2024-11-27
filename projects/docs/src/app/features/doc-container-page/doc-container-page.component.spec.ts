import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocContainerPageComponent } from './doc-container-page.component';

describe('DocContainerPageComponent', () => {
  let component: DocContainerPageComponent;
  let fixture: ComponentFixture<DocContainerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocContainerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocContainerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
