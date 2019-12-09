import {Component, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {GoogleAnalyticsService} from './google-analytics.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  private readonly destroy$ = new Subject<void>();

  constructor(
    private googleAnalytics: GoogleAnalyticsService,
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((navigationEnd: NavigationEnd) => this.googleAnalytics.emitNavigationEndEvent(navigationEnd));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
