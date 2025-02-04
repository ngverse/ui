import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-test-pagination',
  template: `
    <app-pagination
      [currentPage]="currentPage()"
      [totalPages]="totalPages()"
      (pageChange)="onPageChange($event)"
    ></app-pagination>
  `,
  imports: [PaginationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestPaginationComponent {
  currentPage = signal(1);
  totalPages = signal(10);

  onPageChange(page: number) {
    this.currentPage.set(page);
  }
}

describe('PaginationComponent', () => {
  let component: TestPaginationComponent;
  let fixture: ComponentFixture<TestPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPaginationComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render pagination buttons correctly', () => {
    const paginationButtons = fixture.debugElement.queryAll(
      By.css('.pagination-button')
    );
    expect(paginationButtons.length).toBeGreaterThan(0);
  });

  it('should disable previous button on first page', () => {
    const prevButton = fixture.debugElement.query(
      By.css('li:first-child .pagination-button')
    );
    expect(prevButton.nativeElement.disabled).toBeTrue();
  });

  it('should enable next button when not on last page', () => {
    const nextButton = fixture.debugElement.query(
      By.css('li:last-child .pagination-button')
    );
    expect(nextButton.nativeElement.disabled).toBeFalse();
  });

  it('should change pages when a page number is clicked', () => {
    const pageButtons = fixture.debugElement.queryAll(
      By.css('.pagination-button')
    );
    const pageNumber = parseInt(pageButtons[2].nativeElement.innerText);
    pageButtons[2].nativeElement.click();
    fixture.detectChanges();
    expect(component.currentPage()).toBe(pageNumber);
  });

  it('should emit pageChange event when next button is clicked', () => {
    const nextButton = fixture.debugElement.query(
      By.css('li:last-child .pagination-button')
    );
    nextButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.currentPage()).toBe(2);
  });
});
