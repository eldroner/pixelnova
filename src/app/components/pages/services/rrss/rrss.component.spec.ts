import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrssComponent } from './rrss.component';

describe('RrssComponent', () => {
  let component: RrssComponent;
  let fixture: ComponentFixture<RrssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RrssComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RrssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
