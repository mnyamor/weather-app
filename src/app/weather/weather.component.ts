import {Component, Input, OnInit} from '@angular/core';
import {WeatherUtils} from '../utils/weatherUtils';
import {IWeatherData} from '../types/weather';
import {SubscriptionsManagerDirective} from '../directives/subscriptions-manager';
import {WEATHER_RECENT_SEARCH_KEY} from '../constants/constants';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent extends SubscriptionsManagerDirective implements OnInit {
  @Input() recentSearchList: IWeatherData[] = [];
  @Input()
  weatherData: IWeatherData = {
    condition: '',
    country: '',
    date: 0,
    description: '',
    feels_like: 0,
    humidity: 0,
    icon: '',
    name: '',
    pressure: 0,
    sunrise: 0,
    sunset: 0,
    temp_max: 0,
    temp_min: 0,
    temperature: 0,
    visibility: 0,
    windSpeed: 0,
    lat: 0,
    lon: 0
  };

  isActive = false;

  constructor() {
    super();
  }


  dayText(dt: any): string {
    // todo - fix time( use moment or sth...)
    const currDate = new Date(dt * 1000).toString().split(' ');
    return WeatherUtils.getDayText(currDate[0]) + ' ' + currDate[4]?.substring(0, 5);
  }

  ngOnInit(): void {
    console.log(this.recentSearchList);
  }

  toggleActiveClass(status: boolean): void {
    this.isActive = status;
  }

  getUnitConversion(unit: number): number {
    return (this.isActive) ? this.convertToCelsius(unit) : this.convertToFahrenheit(unit);
  }

  convertToFahrenheit(unit: number): number {
    return WeatherUtils.convertCelsiusToFahrenheit(unit);
  }

  convertToCelsius(unit: number): number {
    return WeatherUtils.convertFahrenheitToCelsius(unit);
  }

  convertMilesToKM(unit: number): number {
    return WeatherUtils.convertMilesToKm(unit);
  }

  convertKmToMiles(unit: number): number {
    return WeatherUtils.convertKmToMiles(unit);
  }

  convertUnits(num: number): number {
    return (this.isActive) ? this.convertMilesToKM(num) : this.convertKmToMiles(num);
  }

  clearRecentSearches(): void {
    localStorage.removeItem(WEATHER_RECENT_SEARCH_KEY);
    this.recentSearchList = [];
  }
}
