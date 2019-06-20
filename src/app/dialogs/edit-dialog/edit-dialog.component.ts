import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IProduct } from 'src/app/modals/productData';
import { ServiceService } from 'src/app/user/service.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    public dataService: ServiceService) { }
  ngOnInit() {
    console.log(this.data.name);
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
