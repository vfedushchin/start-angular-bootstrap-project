import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppBoostrapModule } from './app-boostrap/app-boostrap.module';
import { AppComponent } from './app.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {LocalStorageModule} from 'angular-2-local-storage';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DataAccessService} from './providers/data-access/data-access.service';
import {InterceptedHttpClient} from './providers/data-access/httpclient-interceptor';
import {SessionStorageService} from './providers/data-share/session-storage.service';
import {DataShareService} from './providers/data-share/data-share.service';
import { LoginComponent } from './pages/login/login.component';
import { TokenCreateComponent } from './pages/token-create/token-create.component';
import {AuthService} from './providers/auth/auth.service';
import {AuthGuard} from './auth-guard.service';
import { HeaderMainComponent } from './components/header-main/header-main.component';
import { FooterComponent } from './components/footer/footer.component';
import { TokenListComponent } from './pages/token-list/token-list.component';
import {TokensService} from './providers/tokens/tokens.service';
import { HomeMainComponent } from './pages/home-main/home-main.component';



const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  /*{path: 'token-create', component: TokenCreateComponent},
  {path: 'token-list', component: TokenListComponent},*/
  {
    path: '', component: HomeMainComponent, canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'token-list', pathMatch: 'full'},
      {path: 'token-create', component: TokenCreateComponent},
      {path: 'token-list', component: TokenListComponent},
    ]
  },

  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [AppComponent, LoginComponent, TokenCreateComponent, HeaderMainComponent, FooterComponent, TokenListComponent, HomeMainComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppBoostrapModule,
    LocalStorageModule.withConfig(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptedHttpClient, multi: true },
    SessionStorageService,
    AuthService,
    AuthGuard,
    DataShareService,
    DataAccessService,
    TokensService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}