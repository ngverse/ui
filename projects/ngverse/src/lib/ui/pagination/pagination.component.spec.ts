import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PaginationComponent } from './pagination.component';

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

  function goToNextPage() {
    const nextButton = fixture.debugElement.query(
      By.css('li:last-child button')
    );
    nextButton.nativeElement.click();
    fixture.detectChanges();
  }

  it('should render pagination buttons correctly', () => {
    const paginationButtons = fixture.debugElement.queryAll(By.css('button'));
    expect(paginationButtons.length).toBeGreaterThan(0);
  });

  it('should display prev and next buttons', () => {
    const pageButtons = fixture.debugElement.queryAll(By.css('button'));
    expect(pageButtons[0].nativeElement.innerText).toContain('Previous');
    expect(
      pageButtons[pageButtons.length - 1].nativeElement.innerText
    ).toContain('Next');
  });

  it('should disable previous button on first page', () => {
    const prevButton = fixture.debugElement.query(
      By.css('li:first-child button')
    );
    expect(prevButton.nativeElement.disabled).toBeTrue();
  });

  it('should enable next button when not on last page', () => {
    const nextButton = fixture.debugElement.query(
      By.css('li:last-child button')
    );
    expect(nextButton.nativeElement.disabled).toBeFalse();
  });

  it('should change pages when a page number is clicked', () => {
    const pageButtons = fixture.debugElement.queryAll(By.css('button'));
    const pageNumber = parseInt(pageButtons[2].nativeElement.innerText);
    pageButtons[2].nativeElement.click();
    fixture.detectChanges();
    expect(component.currentPage()).toBe(pageNumber);
  });

  it('should emit pageChange event when next button is clicked', () => {
    goToNextPage();
    expect(component.currentPage()).toBe(2);
  });

  it('should emit pageChange event when prev button is clicked', () => {
    goToNextPage();

    const firstButton = fixture.debugElement.query(
      By.css('li:first-child button')
    );
    firstButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.currentPage()).toBe(1);
  });

  describe('Page buttons generation', () => {
    it('should generate and display correct page buttons', () => {
      const cases = [
        {
          totalPages: 10,
          currentPage: 1,
          expectedPages: ['1', '2', '3', '4', '5', '...', '10'],
        },
        {
          totalPages: 10,
          currentPage: 2,
          expectedPages: ['1', '2', '3', '4', '5', '...', '10'],
        },
        {
          totalPages: 10,
          currentPage: 3,
          expectedPages: ['1', '2', '3', '4', '5', '...', '10'],
        },
        {
          totalPages: 10,
          currentPage: 4,
          expectedPages: ['1', '2', '3', '4', '5', '...', '10'],
        },
        {
          totalPages: 10,
          currentPage: 5,
          expectedPages: ['1', '...', '4', '5', '6', '...', '10'],
        },
        {
          totalPages: 10,
          currentPage: 6,
          expectedPages: ['1', '...', '5', '6', '7', '...', '10'],
        },
        {
          totalPages: 10,
          currentPage: 7,
          expectedPages: ['1', '...', '6', '7', '8', '9', '10'],
        },
        {
          totalPages: 10,
          currentPage: 8,
          expectedPages: ['1', '...', '6', '7', '8', '9', '10'],
        },
        {
          totalPages: 2,
          currentPage: 1,
          expectedPages: ['1', '2'],
        },
        {
          totalPages: 1,
          currentPage: 1,
          expectedPages: ['1'],
        },
        {
          totalPages: 5,
          currentPage: 1,
          expectedPages: ['1', '2', '3', '4', '5'],
        },
        {
          totalPages: 5,
          currentPage: 3,
          expectedPages: ['1', '2', '3', '4', '5'],
        },
        {
          totalPages: 0,
          currentPage: 1,
          expectedPages: [],
        },
        {
          totalPages: 13,
          currentPage: 1,
          expectedPages: ['1', '2', '3', '4', '5', '...', '13'],
        },
        {
          totalPages: 13,
          currentPage: 6,
          expectedPages: ['1', '...', '5', '6', '7', '...', '13'],
        },
        {
          totalPages: 13,
          currentPage: 9,
          expectedPages: ['1', '...', '8', '9', '10', '...', '13'],
        },
        {
          totalPages: 13,
          currentPage: 11,
          expectedPages: ['1', '...', '9', '10', '11', '12', '13'],
        },
        //Out of range current page
        {
          totalPages: 5,
          currentPage: 10,
          expectedPages: ['1', '2', '3', '4', '5'],
        },
      ];

      for (const _case of cases) {
        const { totalPages, currentPage, expectedPages } = _case;
        component.totalPages.set(totalPages);
        component.currentPage.set(currentPage);
        fixture.detectChanges();
        // query all buttons except prev/next
        const pageButtons = fixture.debugElement
          .queryAll(By.css('li:not(:first-child):not(:last-child)'))
          .map((pageButton) => pageButton.nativeElement.innerText);

        expect(pageButtons).toEqual(expectedPages);
      }
    });
  });
});
