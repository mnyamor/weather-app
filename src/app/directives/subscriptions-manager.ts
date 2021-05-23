import {Subscription} from 'rxjs';
import {Directive, OnDestroy} from '@angular/core';

@Directive()
export class SubscriptionsManagerDirective implements OnDestroy {
  subscriptions: Subscription[] = [];

  autoUnsubscribe(s: Subscription): void {
    this.subscriptions.push(s);
  }

  ngOnDestroy(): void {
    this.subscriptions.map((sub: Subscription) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
    this.subscriptions = [];
  }
}
