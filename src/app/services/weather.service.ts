import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {IWeatherData} from '../types/weather';
import {map} from 'rxjs/operators';
import {WeatherUtils} from '../utils/weatherUtils';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {
  }

  static transformWeatherData(data: any): IWeatherData {
    return {
      name: data?.sys.country ? data?.name + ', ' + data.sys.country : data?.name,
      date: data.dt * 1000,
      description: data.weather[0].description,
      windSpeed: data.wind?.speed,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      visibility: data.visibility,
      temperature: data.main.temp,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      icon: WeatherUtils.getWeatherIcon(data.weather[0]
        ? data.weather[0].icon : data.icon.substr(0, 2) ? data.condition.icon : data.condition),
      condition: data.weather[0],
      country: data.sys.country ,
      sunrise: data.sys.sunrise * 1000,
      sunset: data.sys.sunset * 1000,
      lon: data.coord.lon,
      lat: data.coord.lat,
    };
  }

  getWeatherDataForCity(searchQuery: string): Observable<IWeatherData> {
    return this.http.get<any>(
      `${environment.apiUrl}/weather?q=${searchQuery}&lang=en&units=imperial&appid=${environment.apiKey}`)
      .pipe(map(res => WeatherService.transformWeatherData(res)));
  }

  findLocationSuggestions(term: string): Observable<any> {
    return (term === '') ? of([]) : this.http.get<any>(
      `http://api.openweathermap.org/data/2.5/find?q=${term}&units=imperial&appid=${environment.apiKey}`)
      .pipe(map(res => res.list.map((item: IWeatherData) => WeatherService.transformWeatherData(item))
      ));
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(error.message);
  }
}

