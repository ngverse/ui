import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueprintPageComponent } from './blueprint-page.component';

describe('BlueprintPageComponent', () => {
  let component: BlueprintPageComponent;
  let fixture: ComponentFixture<BlueprintPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlueprintPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlueprintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
