import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CInstallationComponent } from './c-installation.component';

describe('CInstallationComponent', () => {
  let component: CInstallationComponent;
  let fixture: ComponentFixture<CInstallationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CInstallationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
