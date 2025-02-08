import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TabGroupHeaderComponent } from './tab-group-header.component';

describe('TabGroupHeaderComponent', () => {
  let component: TabGroupHeaderComponent;
  let fixture: ComponentFixture<TabGroupHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
      imports: [TabGroupHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabGroupHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
