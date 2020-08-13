import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../Services/authenticate.service';
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
    ) { 
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
    this._authenticationService.isLoggedin.next(false);
    this.router.navigate(['login'], {replaceUrl: true});
  }
}
