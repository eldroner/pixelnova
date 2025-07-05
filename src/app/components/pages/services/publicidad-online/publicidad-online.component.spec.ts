import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicidadOnlineComponent } from './publicidad-online.component';

describe('PublicidadOnlineComponent', () => {
  let component: PublicidadOnlineComponent;
  let fixture: ComponentFixture<PublicidadOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicidadOnlineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicidadOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
