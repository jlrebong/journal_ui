import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterpageComponent } from './pages/registerpage/registerpage.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './core/guard/auth.guard';
import { LogoutComponent } from './pages/logout/logout.component';
import { StocksComponent } from './pages/admin/stocks/stocks.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { ErrorComponent } from './pages/error/error.component';
import { ClosedtradesComponent } from './pages/closedtrades/closedtrades.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChartComponent } from './pages/chart/chart.component';

const routes: Routes = [
  { path : '', component : LandingpageComponent,},
  { path : 'landing', component : LandingpageComponent,},
  { path : 'register', component : RegisterpageComponent,},
  { path : 'login', component : LoginpageComponent,},
  { path : 'logout', component : LogoutComponent,},
  { path : 'home', component : HomeComponent, canActivate: [authGuard]},
  { path : 'closedtrades', component : ClosedtradesComponent, canActivate: [authGuard]},
  { path : 'profile', component : ProfileComponent, canActivate: [authGuard]},
  { path : 'charts', component : ChartComponent, canActivate: [authGuard]},

  { path : 'admin/stocks', component : StocksComponent , canActivate: [authGuard]},
  { path : 'admin/users', component : UsersComponent , canActivate: [authGuard]},

  { path : 'error', component : ErrorComponent},
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
