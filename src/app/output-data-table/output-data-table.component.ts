import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatSort, MatTableDataSource,MatPaginator} from '@angular/material';
import {TeamDetails} from '../modals/productData'
import{ImportedDataComponent} from '../dialogs/imported-data/imported-data.component';
@Component({
  selector: 'output-data-table',
  templateUrl: './output-data-table.component.html',
  styleUrls: ['./output-data-table.component.css']
})
export class OutputDataTableComponent implements OnInit {

  displayedColumns: string[] = ['sr_no','name', 'project_name', 'release', 'project_status','target_fps','fp_closed','target_sps','sp_closed','bugs_raised','bugs_closed'];

  dataSource;

  users: TeamDetails[];

 @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(    
              public dialog: MatDialog
            ) { }

  ngOnInit() {
                //here we will be adding login method
              }

  // Refreshing table is just redifining matDataSource
  public refreshTable(){
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      console.log("page refreshed");
    }

  //dialog method to be called when user click on import data button
  importData(teamdetails:any) {
      const dialogRef = this.dialog.open(ImportedDataComponent, {
      height: '490px',
      width: '500px',
      disableClose: true,
      data: {teamdetails}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== 0) {
          //adding one row in users array by pushing object
          this.users.push(result);
          this.refreshTable();
          }

        if(result===0){
          console.log("terminated");
          }
        });

    }

}

