import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { SecurityInterceptor } from './home/helpers/security.interceptor';
import { AuthGuard } from './home/helpers/auth.guard';
import { NgbModule, NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { UserModule } from './user/user.module';
import { AuthenticateService } from './Services/authenticate.service';
import { ListComponent } from './user/list/list.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage } from 'angularfire2/storage';
import { environment } from 'src/environments/environment';

const appRoutes: Routes = [
  {path:'',component: ListComponent},
  {path:'login',component: LoginComponent},
  {path:'signup', component:SignupComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
   
  ],
  imports: [
    BrowserModule,
    HomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    UserModule,
    RouterModule,
    NgbDropdownModule,
    RouterModule.forRoot(appRoutes,{enableTracing:false}),
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    Title,
    AuthenticateService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptor,
    multi:true
    },
    AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
