import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorialListComponent } from './memorial-list.component';

describe('MemorialListComponent', () => {
  let component: MemorialListComponent;
  let fixture: ComponentFixture<MemorialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemorialListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemorialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
