import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsComponent } from './webs.component';

describe('WebsComponent', () => {
  let component: WebsComponent;
  let fixture: ComponentFixture<WebsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
