import {Component, OnInit} from '@angular/core';
import {Observable, of, OperatorFunction} from 'rxjs';
import {WeatherService} from '../services/weather.service';
import {IWeatherData} from '../types/weather';
import {catchError, debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';
import {SubscriptionsManagerDirective} from '../directives/subscriptions-manager';
import {WEATHER_LOCATION_STATE_KEY, WEATHER_RECENT_SEARCH_KEY} from '../constants/constants';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent extends SubscriptionsManagerDirective implements OnInit {
  searching = false;
  searchFailed = false;
  model: IWeatherData | any;
  searchResults: IWeatherData = {} as IWeatherData;
  searchTerm = '';
  recentSearches: any[] = [];

  constructor(private weatherService: WeatherService) {
    super();
    if (localStorage.getItem(WEATHER_LOCATION_STATE_KEY) !== null) {
      this.recentSearches = JSON.parse(localStorage.getItem(WEATHER_RECENT_SEARCH_KEY) as string);
      this.searchResults = JSON.parse(localStorage.getItem(WEATHER_LOCATION_STATE_KEY) as string);
    }
  }

  static saveRecentSearchToLocalStorage(data: any): any[] {
    let arr: any[];
    // Parse the serialized data back into an array of objects
    arr = JSON.parse(localStorage.getItem(WEATHER_RECENT_SEARCH_KEY) as string) || [];
    arr.push(data);
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem(WEATHER_RECENT_SEARCH_KEY, JSON.stringify(arr));
    return arr;
  }

  searchFormatter = (item: { name: string }) => item.name;

  ngOnInit(): void {
  }

  search: OperatorFunction<string, readonly any[]> | null | undefined = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(searchTerm => searchTerm.length > 2),
      tap(() => this.searching = true),
      switchMap(term => {
          this.searchTerm = term;
          return this.weatherService.findLocationSuggestions(term)
            .pipe(tap(_ => this.searchFailed = false),
              catchError(() => {
                this.searchFailed = true;
                return of([]);
              }));
        }
      ),
      tap(() => this.searching = false)
    );

  selectCity($event: NgbTypeaheadSelectItemEvent): void {
    if ($event?.item) {
      this.searching = false;
      this.displayWeatherData($event.item.name);
    }
  }

  private displayWeatherData(term: string): void {
    this.autoUnsubscribe(this.weatherService.getWeatherDataForCity(term).subscribe(res => {
      this.searchResults = res;
      localStorage.setItem(WEATHER_LOCATION_STATE_KEY, JSON.stringify(this.searchResults));
      this.recentSearches = SearchComponent.saveRecentSearchToLocalStorage(this.searchResults);
    }));
  }
}
