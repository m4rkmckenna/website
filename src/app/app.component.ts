import {Component, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {Util} from './Util';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  private readonly destroy$ = new Subject<void>();

  constructor(private router: Router) {
    if (environment.analytics.google.enabled) {

    }
    router.events
      .pipe(
        takeUntil(this.destroy$),
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe((e: NavigationEnd) =>
        Util.gtag('config', environment.analytics.google.code, {page_path: e.urlAfterRedirects})
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
