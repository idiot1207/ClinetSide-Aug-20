import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ServiceService } from 'src/app/user/service.service';
import { IProduct } from 'src/app/modals/productData';
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IProduct,
              public dataService: ServiceService) { }

  ngOnInit() {
  }
  formControl = new FormControl('', [
    Validators.required
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
        '';
  }
  save(){
    this.data.TSP=this.data.feature_point*this.data.story_point;
    this.data.sprints=this.data.TSP/this.data.velocity;
    //after using dialogref.close function , this.data will be passed to afterclose function of data-table of additem 
    this.dialogRef.close(this.data);

  }
  cancel(){
    console.log("no data added");
    this.dialogRef.close(0);
  }
}
