import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppBoostrapModule } from './app-boostrap/app-boostrap.module';
import { AppComponent } from './app.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DataAccessService} from './providers/data-access/data-access.service';
import {InterceptedHttpClient} from './providers/data-access/httpclient-interceptor';
import {SessionStorageService} from './providers/data-share/session-storage.service';
import {DataShareService} from './providers/data-share/data-share.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppBoostrapModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptedHttpClient, multi: true },
    SessionStorageService,
    DataShareService,
    DataAccessService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}