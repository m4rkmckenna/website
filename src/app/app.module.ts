import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {HeaderComponent} from './main/header/header.component';
import {SocialComponent} from './main/social/social.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {GoogleAnalyticsErrorHandler} from './google-analytics.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    SocialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    {provide: ErrorHandler, useClass: GoogleAnalyticsErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
