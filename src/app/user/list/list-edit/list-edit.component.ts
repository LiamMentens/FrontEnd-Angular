import { Component, OnInit } from '@angular/core';
import { Lijst } from 'src/app/models/lijst.model';
import { ListService } from 'src/app/Services/list.service';
import { Item } from 'src/app/models/item.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/Services/item.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.scss']
})
export class ListEditComponent implements OnInit {
  item: Item = new Item(0,0,'','','',null,null)
  curList: any;
  curItems: Item[];
  curListID:number;
  itemForm: FormGroup;
  currenDate:Date;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  imageurl: string;
  submitted = false;
  closeResult ='';

  constructor(
    private _listService:ListService,
    private _itemService:ItemService,
    private _lijstService:ListService,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private router:Router,
    private modalService:NgbModal, 
    private afStorage: AngularFireStorage

  ) { }

  ngOnInit(): void {
    this.curListID = 0;

    this.route.paramMap.subscribe(params=> {
      this.curListID = Number(params.get('id'));
    })

    this._listService.getListByID(this.curListID).subscribe(
      result=> {
        this.curList = result;
        console.log(result);
      })

    this.itemForm = this.fb.group({
      naam: new FormControl('',Validators.required),
      beschrijving: new FormControl('',Validators.required),
      foto: new FormControl('',Validators.required),
    })

  }
  
    onSubmit(){
      this.submitted =true;

      this.item.naam = this.itemForm.get(['naam']).value;
      this.item.beschrijving = this.itemForm.get(['beschrijving']).value;
      this.item.foto = this.imageurl;
      this.item.lijstID = this.curListID;
      
      console.log(this.item);

      this._itemService.additem(this.item).subscribe(result=>
        {
          this.curList.items.push(result);
          console.log(result)
          // this.router.navigate(['/listEdit/'+this.curListID], {replaceUrl: true});
        })
      this.submitted=false;
    }


    closeList(){
      this.currenDate = new Date();
      this.curList.eindDatum = this.currenDate;
      this._lijstService.updateLijst(this.curListID, this.curList).subscribe(result => {
        this.router.navigate(['dashboard'], {replaceUrl: true});
      })
    }

    startList(){
      this.currenDate = new Date();
      this.curList.startDatum = this.currenDate;
      this._lijstService.updateLijst(this.curListID, this.curList).subscribe(result => {
        this.router.navigate(['dashboard'], {replaceUrl: true});
      })
    }

    deleteItem(curItemID:number){
      this._itemService.deleteItem(curItemID).subscribe(result=>{
        console.log(result);
        this.curList.items = this.curList.items.filter(item=> item.itemID !==curItemID);
      });
    }

    deleteList(listID:number){
      this._listService.deleteList(listID).subscribe(result=>{
        console.log(result);
        this.router.navigate(['dashboard'], {replaceUrl: true});
      });

    }


    upload(event) {
      const id = Math.random().toString(36).substring(2);
      this.ref = this.afStorage.ref(id);
      this.task = this.ref.put(event.target.files[0]);
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe(url => {
            this.imageurl = url;
          })
        })
      ).subscribe();
    }


    editItem(curItemID:number){
      return;
    }

    openItemModal(contentItem) {
      this.modalService.open(contentItem, {ariaLabelledBy: 'itemModal'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    deleteListModal(deleteList) {
      this.modalService.open(deleteList, {ariaLabelledBy: 'deleteListModal'}).result.then((result) => {
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
