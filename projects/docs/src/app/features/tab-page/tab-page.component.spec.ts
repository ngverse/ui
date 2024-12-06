import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPageComponent } from './tab-page.component';

describe('TabPageComponent', () => {
  let component: TabPageComponent;
  let fixture: ComponentFixture<TabPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
