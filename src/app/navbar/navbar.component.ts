import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../Services/authenticate.service';
import { Login } from '../models/login.model';
import { NavbarService } from '../Services/navbar.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn:boolean;
  constructor(
    private router:Router, 
    private _authenticationService: AuthenticateService,
    private titleService: Title
    // private nav : NavbarService,
    ) { 
    // this.nav.hide();
  }
  
  ngOnInit(): void {
    this._authenticationService.isLoggedin.subscribe(e => {
      if (this._authenticationService.isLoggedin.value == true) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false; 
      }
    });

  
  }

  public setTitle(newTitle:string){
    
    this.titleService.setTitle(newTitle)
  }

  logOff(){
    localStorage.removeItem('token');
    sessionStorage.clear();
    // this.nav.hide();
    this._authenticationService.isLoggedin.next(false);
    this.router.navigate(['login'], {replaceUrl: true});
  }
}
