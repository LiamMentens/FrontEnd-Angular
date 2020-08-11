import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/Services/authenticate.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Login } from 'src/app/models/login.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Gebruiker } from 'src/app/models/gebruiker.model';
import { NavbarService } from 'src/app/Services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;

  constructor(private fb: FormBuilder,private _authenticationService: AuthenticateService, private router:Router, private nav: NavbarService) { }

  loginForm = this.fb.group({
     email: new FormControl('',Validators.required),
     wachtwoord: new FormControl('',Validators.required)
   });
   
  ngOnInit(): void {
  }
      onSubmit(){
        this.submitted = true;
        console.log(this.submitted);
        console.log(this.loginForm.getRawValue());
      
        this._authenticationService.authenticate(this.loginForm.value).subscribe(result => {
          console.log(result);

          localStorage.setItem('token', result.token); 
          localStorage.setItem('GebruikerID', String(result.gebruikerID));

          this._authenticationService.isLoggedin.next(result.token ? true : false);
          this.router.navigate(['/dashboard'], {replaceUrl: true});
          
        });
      
      
      }



}
