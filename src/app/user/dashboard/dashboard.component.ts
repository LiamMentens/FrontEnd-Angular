import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GebruikerService } from 'src/app/Services/gebruiker.service';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { Lijst } from 'src/app/models/lijst.model';
import { Dashboard } from 'src/app/ViewModels/dashboard.viewModel';
import { Stem } from 'src/app/models/stem.model';
import { Item } from 'src/app/models/item.model';
import { ListService } from 'src/app/Services/list.service';
import { LijstGebruiker } from 'src/app/models/lijst-gebruiker.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  gebruikerID = Number(localStorage.getItem('GebruikerID'));
  model: Lijst = new Lijst(0,'','',null,null,null,null);
  lijsten: Lijst[];
  stemmen: Stem[];
  items: Item[];
  dashboard: Dashboard;
  listForm: FormGroup;
  
  closeResult = '';

  submitted = false;
  lists =true;
  votes=false;


  constructor(private router:Router, private fb: FormBuilder, private _dashboardService: DashboardService,
     private modalService: NgbModal,
     private _listService:ListService,
     
     ) { 
  }
  ngOnInit(): void {
    this.listForm = this.fb.group({
      naam: new FormControl('',Validators.required),
      beschrijving: new FormControl('',Validators.required),
      startDatum: new FormControl('',Validators.required),
      eindDatum: new FormControl('',Validators.required),
    })

    this.lijsten = [];
    this.stemmen = [];
    this.load()
  }
  
  get f() { return this.listForm.controls; }

  load(){
    this.laadDashboard(this.gebruikerID);
  }
  
  private laadDashboard(gebruikerID: number){
    this._dashboardService.getDashboard(gebruikerID).subscribe(
      result => {
        this.dashboard = result;
        this.lijsten = this.dashboard.beheerderLijsten;
        this.stemmen = this.dashboard.uitStemmen;
      });
  }

  onSubmit(){
    this.submitted = true;

    this.model.Naam = this.listForm.get(['naam']).value;
    this.model.Beschrijving = this.listForm.get(['beschrijving']).value;
    this.model.StartDatum = this.listForm.get(['startDatum']).value;
    this.model.EindDatum = this.listForm.get(['eindDatum']).value;
    this.model.GebruikerID = Number(localStorage.getItem('GebruikerID'));
    this._listService.addList(this.model).subscribe(result => {
      this.lijsten.push(result);
      console.log(result);
    
    });
    this.submitted=false;
  }

  showVotes(){
    this.votes=true;
    this.lists=false
  }
  showLists(){
    this.lists=true
    this.votes=false;
  }

  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
