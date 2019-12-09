import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {GoogleAnalyticsService} from '../../google-analytics.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  readonly links = environment.links;

  constructor(
    private googleAnalytics: GoogleAnalyticsService
  ) {
  }

  ngOnInit() {

  }

  clickEvent(label: string = null) {
    this.googleAnalytics.emitEvent(`${label}-social-link-click`, 'social-link', label);
  }

}
