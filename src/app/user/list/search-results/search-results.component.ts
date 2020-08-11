import { Component, OnInit, Input } from '@angular/core';
import { Lijst } from 'src/app/models/lijst.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  @Input() lists: Lijst[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
