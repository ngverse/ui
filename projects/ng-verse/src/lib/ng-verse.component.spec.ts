import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgVerseComponent } from './ng-verse.component';

describe('NgVerseComponent', () => {
  let component: NgVerseComponent;
  let fixture: ComponentFixture<NgVerseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgVerseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgVerseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
