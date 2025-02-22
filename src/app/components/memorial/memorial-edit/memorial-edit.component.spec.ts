import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorialEditComponent } from './memorial-edit.component';

describe('MemorialEditComponent', () => {
  let component: MemorialEditComponent;
  let fixture: ComponentFixture<MemorialEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemorialEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemorialEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
