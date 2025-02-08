import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherformComponent } from './weatherform.component';

describe('WeatherformComponent', () => {
  let component: WeatherformComponent;
  let fixture: ComponentFixture<WeatherformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
