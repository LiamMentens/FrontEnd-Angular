import { Component, OnInit } from '@angular/core';
import { Lijst } from 'src/app/models/lijst.model';
import { ListService } from 'src/app/Services/list.service';
import { Item } from 'src/app/models/item.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  lijsten: Lijst[] = [];
  selectedList : Lijst = null;
  searchString: string = "";
  searchResults: Lijst[] = [];
  noResult = true;
  randomLists:Lijst[] = [];

  lijstID:number = null;
  lijstNaam:string = "";

  searchForm:FormGroup;
  public isCollapsed =false;

  constructor(
    private _listService: ListService,
    private fb: FormBuilder
    ) {
    this._listService.getLists().subscribe(
      result => {
        this.lijsten = result;
      }
    );
   }

  ngOnInit(): void {
    this.searchResults=[];

    this.searchForm = this.fb.group({
      searchBox: new FormControl('',Validators.required)
    })

    this.showRandomList();
  }

  searchList(){
    this.searchResults=[];
    this.selectedList = null;
    this.noResult=true;
    this.searchString = this.searchForm.get(['searchBox']).value;
    if(this.searchString != ""){
      this.randomLists=[];
      this.lijsten.forEach(element => {
        if(element.naam.toLowerCase().includes(this.searchString.toLowerCase())){
          this.searchResults.push(element)
        }
      });
    }
    console.log(this.searchResults)
  }

  showRandomList(){
    for (let index = 1; index < 6; index++) {
      this._listService.getListByID(index).subscribe(result=>{
        this.randomLists.push(result);
      })
    }
    console.log(this.randomLists)
  }
}
