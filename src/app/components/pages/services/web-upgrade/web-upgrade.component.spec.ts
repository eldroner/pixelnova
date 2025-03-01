import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebUpgradeComponent } from './web-upgrade.component';

describe('WebUpgradeComponent', () => {
  let component: WebUpgradeComponent;
  let fixture: ComponentFixture<WebUpgradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebUpgradeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
