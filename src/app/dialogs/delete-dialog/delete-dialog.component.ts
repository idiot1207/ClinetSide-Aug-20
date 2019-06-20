import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ServiceService } from 'src/app/user/service.service';
import { IProduct } from 'src/app/modals/productData';
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: ServiceService) { }

  ngOnInit() {
    //console.log(this.data);
  }
  deleteData(){
    this.dialogRef.close(1);

  } 
  noAction(){
    this.dialogRef.close(0);

  }
}
