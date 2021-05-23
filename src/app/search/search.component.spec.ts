import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchComponent} from './search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WeatherService} from '../services/weather.service';
import {HttpClientModule} from '@angular/common/http';
import {WeatherComponent} from '../weather/weather.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {WEATHER_LOCATION_STATE_KEY} from '../constants/constants';
import {IWeatherData} from '../types/weather';

class MockWeatherService {
  static getWeatherDataForCity: any;

  getWeatherDataForCity(city: string): IWeatherData {
    return {
      condition: '',
      country: 'GB',
      date: 1621796787000,
      description: 'light rain',
      feels_like: 50.85,
      humidity: 84,
      icon: 'wi wi-rain',
      name: 'London, GB',
      pressure: 0,
      sunrise: 1621742276000,
      sunset: 1621799814000,
      temp_max: 54.7,
      temp_min: 49.44,
      temperature: 52,
      visibility: 10000,
      windSpeed: 1.01,
      lat: 51.5085,
      lon: -0.1257
    };
  }
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  const mockService: MockWeatherService = new MockWeatherService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent, WeatherComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        NgbTypeaheadModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: WeatherService,
          useClass: MockWeatherService
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load recent search on init', () => {
    window.localStorage.setItem(WEATHER_LOCATION_STATE_KEY, JSON.stringify(component.searchResults));
    component.ngOnInit();
    expect(component.searchResults).toBeDefined();
  });

  it('get weather data on search', () => {
    mockService.getWeatherDataForCity('London');
    fixture.detectChanges();
    expect(mockService.getWeatherDataForCity('London').temperature).toBe(52);
  });
});
