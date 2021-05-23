import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WeatherComponent} from './weather.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change find element', () => {
    const tempEl: DebugElement = fixture.debugElement.query(By.css('.weather__temperature-num'));
    expect(tempEl).toBeTruthy();
  });
});
