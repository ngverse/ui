import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandInstallationComponent } from './command-installation.component';

describe('CommandInstallationComponent', () => {
  let component: CommandInstallationComponent;
  let fixture: ComponentFixture<CommandInstallationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandInstallationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandInstallationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
