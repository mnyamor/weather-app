import {inject, TestBed} from '@angular/core/testing';
import {cloneDeep} from 'lodash';

import {WeatherService} from './weather.service';
import {HttpClientModule} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IWeatherData} from '../types/weather';


const weatherDataMock = {
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

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expect WeatherService to be defined',
    inject([WeatherService], (service1: WeatherService) => {
      expect(service1).toBeTruthy();
    })
  );
});

@Injectable()
export class WeatherMockService {
  static transformWeatherData(data: any): IWeatherData {
    return cloneDeep(weatherDataMock);
  }

  static getMockedSchemas(): IWeatherData[] {
    const weatherData1 = cloneDeep(weatherDataMock);
    weatherData1.name = 'Helsinki, Fi';
    weatherData1.feels_like = 10;
    weatherData1.country = 'FI';
    weatherData1.temp_max = 10;
    weatherData1.temp_min = -1;
    weatherData1.lat = 40.5085;
    weatherData1.lon = -1.1257;
    weatherData1.sunrise = 1621742276000;
    weatherData1.sunset = 1621799814000;
    weatherData1.description = 'sunny';
    return [weatherDataMock, weatherData1];
  }
}
