import {Component, OnInit} from '@angular/core';
import {SubscriptionsManagerDirective} from './directives/subscriptions-manager';
import {BehaviorSubject} from 'rxjs';
import {IWeatherData} from './types/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends SubscriptionsManagerDirective implements OnInit {
  searchResults: BehaviorSubject<IWeatherData> = new BehaviorSubject<IWeatherData>({} as IWeatherData);

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
