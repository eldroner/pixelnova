import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorialCreateComponent } from './memorial-create.component';

describe('MemorialCreateComponent', () => {
  let component: MemorialCreateComponent;
  let fixture: ComponentFixture<MemorialCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemorialCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemorialCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
