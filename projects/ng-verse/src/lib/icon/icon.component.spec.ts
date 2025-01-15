import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { IconComponent } from './icon.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { IconLoaderService } from '@ng-verse/icon/icon-loader.service';
import { IconRegistryService } from '@ng-verse/icon/icon-registry.service';

@Component({
  selector: 'app-test-icon',
  template: ` <app-icon [name]="'test'"></app-icon>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class TestIconComponent {}

describe('IconComponent', () => {
  let component: TestIconComponent;
  let fixture: ComponentFixture<TestIconComponent>;
  let registryService: IconRegistryService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestIconComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        IconLoaderService,
        IconRegistryService,
      ],
    }).compileComponents();

    registryService = TestBed.inject(IconRegistryService);
    httpMock = TestBed.inject(HttpTestingController);
    registryService.addSvgIcon('test', 'assets/icons/test-icon.svg');
    fixture = TestBed.createComponent(TestIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display icon', () => {
    const content = '<svg>test</svg>';
    const req = httpMock.expectOne('assets/icons/test-icon.svg');
    req.flush(content);

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.icon').innerHTML).toBe(
      content
    );
  });
});
