import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './core/footer/footer.component';
import { RegisterComponent } from './core/register/register.component';
import { RegisterpageComponent } from './pages/registerpage/registerpage.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { LoginComponent } from './core/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { StocksComponent } from './pages/admin/stocks/stocks.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { HeaderComponent } from './core/header/header.component';
import { NgChartsModule } from 'ng2-charts';
import { TradesComponent } from './core/trades/trades.component';
import { ErrorComponent } from './pages/error/error.component';
import { TradeentryComponent } from './core/dialog/tradeentry/tradeentry.component';
import { ClosedtradesComponent } from './pages/closedtrades/closedtrades.component';
import { AddcashComponent } from './core/dialog/portfolio/addcash/addcash.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChartComponent } from './pages/chart/chart.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    RegisterpageComponent,
    LandingpageComponent,
    LoginpageComponent,
    HomeComponent,
    LogoutComponent,
    StocksComponent,
    UsersComponent,
    HeaderComponent,
    TradesComponent,
    ErrorComponent,
    TradeentryComponent,
    ClosedtradesComponent,
    AddcashComponent,
    ProfileComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
  ],
  exports : [
    HeaderComponent,
    FooterComponent, 
    RegisterComponent,
    LoginComponent,
    TradesComponent,
    ErrorComponent,
    TradeentryComponent,
    ClosedtradesComponent,
    AddcashComponent
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
