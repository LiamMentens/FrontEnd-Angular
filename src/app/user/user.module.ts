import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ListComponent } from './list/list.component';
import { ListService } from '../Services/list.service';
import { NgbModule, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ListDetailComponent } from './list/list-detail/list-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListEditComponent } from './list/list-edit/list-edit.component';
import { Router, RouterModule } from '@angular/router';
import { SearchResultsComponent } from './list/search-results/search-results.component';



@NgModule({
  declarations: [DashboardComponent, ProfileComponent, ListComponent, ListDetailComponent, ListEditComponent, SearchResultsComponent],
  providers:[ListService],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
