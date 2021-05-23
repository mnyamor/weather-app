import {Component, Input} from '@angular/core';
import {IWeatherData} from '../../types/weather';

@Component({
  selector: 'app-recent-search-list',
  templateUrl: './recent-search-list.component.html',
  styleUrls: ['./recent-search-list.component.scss'],
})
export class RecentSearchListComponent {
  @Input() recentSearchList: IWeatherData[];
}
