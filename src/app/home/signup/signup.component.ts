import { Component, OnInit } from '@angular/core';
import { Gebruiker } from 'src/app/models/gebruiker.model';
import { GebruikerService } from 'src/app/Services/gebruiker.service';
import { FormBuilder, FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  model: Gebruiker = new Gebruiker(0,'','','','',null);
  submitted : boolean = false;
  userForm: FormGroup;
  userNameInUse:boolean;
  emailInUse:boolean;
  
  constructor(
    private fb: FormBuilder, 
    private _gebruikerService: GebruikerService, 
    private router:Router,
    ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: new FormControl('',Validators.required),
      gebruikersnaam: new FormControl('',Validators.required),
      wachtwoord: new FormControl('',Validators.required),
      wachtwoordVerification: new FormControl('',Validators.required)
    }, {
      validator: this.matchPasswordAdd
    });
  }

  get f() { return this.userForm.controls; }

  onSubmit(){
    this.submitted = true;

    this._gebruikerService.checkUsername(this.userForm.get(['gebruikersnaam']).value).subscribe(
      result => {
        this.userNameInUse = result.valueOf()
        if(this.userNameInUse == false){
          console.log("username available")
          this._gebruikerService.checkEmail(this.userForm.get(['email']).value).subscribe(
            result => {
              this.emailInUse = result.valueOf();
    
              if(this.emailInUse == false){
                this.model.Email = this.userForm.get(['email']).value;
                this.model.Gebruikersnaam = this.userForm.get(['gebruikersnaam']).value;
                this.model.Wachtwoord = this.userForm.get(['wachtwoord']).value;
            
                if( this.userForm.get(['wachtwoord']).value ==  this.userForm.get(['wachtwoordVerification']).value){
                  this._gebruikerService.addGebruiker(this.model).subscribe(result => {
                    console.log(result);
                    console.log("Account created");
                    this.router.navigate(['login'], {replaceUrl: true});
                  });
                }else{
                  console.log("Verification is incorrect");
                }
              }
            }
          )
        }
        else{
          console.log("Username taken");
        }
      }
    );
  }


  onReset(){
    this.submitted = false;
    this.userForm.reset();
  }


  matchPasswordAdd(control: AbstractControl){
    let passw = control.get('wachtwoord').value;
    let passwval = control.get('wachtwoordVerification').value;
    if (passw != passwval){
      control.get('wachtwoordVerification').setErrors({MatchPassword: true});
    }else{
      return null;
    }
  }
}
