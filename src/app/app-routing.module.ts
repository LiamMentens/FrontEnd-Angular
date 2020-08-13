import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { AuthGuard } from './home/helpers/auth.guard';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ListComponent } from './user/list/list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListDetailComponent } from './user/list/list-detail/list-detail.component';
import { ListEditComponent } from './user/list/list-edit/list-edit.component';
import { SearchResultsComponent } from './user/list/search-results/search-results.component';


const routes: Routes = [
  {path:'list',component: ListComponent, canActivate:[AuthGuard]},
  {path:'listDetail',component: ListDetailComponent},
  {path:'listDetail/:id',component: ListDetailComponent},
  {path:'listEdit/:id',component: ListEditComponent, canActivate:[AuthGuard]},
  {path:'searchResults',component: SearchResultsComponent, canActivate:[AuthGuard]},
  {path:'dashboard',component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'navbar',component: NavbarComponent, canActivate:[AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
