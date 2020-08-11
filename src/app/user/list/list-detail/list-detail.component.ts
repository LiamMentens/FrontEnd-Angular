import { Component, OnInit, Input } from '@angular/core';
import { ListService } from 'src/app/Services/list.service';
import { Lijst } from 'src/app/models/lijst.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/Services/item.service';
import { Item } from 'src/app/models/item.model';
import { Stem } from 'src/app/models/stem.model';
import { StemService } from 'src/app/Services/stem.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent implements OnInit {
  public isCollapsed = false;
  curListID : number;
  itemID:number;
  gebruikerID:number = Number(localStorage.getItem("GebruikerID"));

  vote:Stem = new Stem(0,0,0,null,null);
  voted: boolean;
  curList: Lijst=null;
  lijstDatum:Lijst=null;
  currentDate:Date;
  ended:boolean;
  open:boolean;

  VoteCount= [];

  constructor(
    private _itemService: ItemService,
    private _listService:ListService,
    private _stemService: StemService,
    private route: ActivatedRoute,
    private router:Router
    )
    {
      
  
  }

 

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=> {
      this.curListID = Number(params.get('id'));
    })
    this._listService.getListByID(this.curListID).subscribe(
      result=> {
        this.curList = result;
      })
    
      this.load();
    }
    
    load(){
      this.checkVote();
      this.checkDate();
    }
    
    checkVote(){
      this._stemService.checkVote(this.curListID, this.gebruikerID).subscribe(result=>{
        this.voted = result.valueOf();
        if(this.voted == true){
          this.voted = true;
        }else{
          this.voted=false
        }
      })
  }

  checkDate(){
    this._listService.getListByID(this.curListID).subscribe(result =>{
      this.lijstDatum = result;
      this.currentDate = new Date();
      var startDate: Date = new Date(this.lijstDatum.startDatum);
      var endDate: Date = new Date(this.lijstDatum.eindDatum);

      console.log(startDate)
      console.log(endDate)

      if(startDate <= this.currentDate){
        this.open=true;
      }else{
        this.open=false;
      }
      if(endDate >= this.currentDate){
        this.ended=true;
      }else{
        this.ended=false;
      }
    })
  }

  addVote(id){
    this.itemID = id;
  }

  Vote(){
    if(this.itemID != null){
      this.vote.itemID = this.itemID;
      this.vote.gebruikerID = this.gebruikerID;
      console.log(this.vote);
      this._stemService.addVote(this.vote).subscribe(result=>{
        console.log(result);
        this.router.navigate[('dashboard')],{replaceUrl:true}
      });
    }
  }
}