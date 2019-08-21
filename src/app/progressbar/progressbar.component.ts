import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  new =0;
  active=0;
  resolved=20;
  closed=10;

   total=this.new+this.active+this.resolved+this.closed;
   newvalue =this.new!=0?this.new*100/this.total:0;
   activevalue =this.active!=0?this.active*100/this.total:0;
   resolvedvalue =this.resolved!=0?this.resolved*100/this.total:0;
   closedvalue=this.closed!=0?this.closed*100/this.total:0;

}
