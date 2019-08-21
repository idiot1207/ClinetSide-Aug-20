import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { TeamDetails } from '../modals/productData';
import { ImportedDataComponent } from '../dialogs/imported-data/imported-data.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TeamnameService } from '../Service/teamname.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'output-data-table',
  templateUrl: './output-data-table.component.html',
  styleUrls: ['./output-data-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('220ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OutputDataTableComponent implements OnInit {

  displayedColumns: string[] = ['sr_no', 'name', 'project_name', 'release', 'project_status',
    'target_fps', 'fp_closed', 'target_sps', 'sp_closed', 'bugs_raised', 'bugs_closed', 'action'];
  dataSource;
  users: TeamDetails[];
  expandedElement: TeamDetails | null;
  // displayedColumns2: string[] = ['itertaionName', 'startDate', 'finishDate', 'targetFP', 'fpClosed', 'targetSP',
  //   'spClosed', 'bugsRaised', 'bugsClosed'];
  // dataSource2: any;
  iterationData: any;
  teamdetailArray: any;
  // public isExpand = false;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(
    public dialog: MatDialog,
    private teamNameService: TeamnameService,
  ) { }

  ngOnInit() {
    this.users = [];
  }

  // Refreshing table is just redifining matDataSource
  public refreshTable() {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // dialog method to be called when user click on import data button
  importData(teamdetails: TeamDetails) {
    const dialogRef = this.dialog.open(ImportedDataComponent, {
      height: '490px',
      width: '500px',
      disableClose: true,
      data: { teamdetails }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 0) {
        let count = 0;
        for (let i = 0; i < this.users.length; i++) {
          if (result.project_name === this.users[i].project_name) {
            count++;
            alert(' Team Name :' + result.name + '\nProject Name :' + result.project_name + '\nalready exists');
          }
        }
        if (count === 0) {
          this.users.push(result);
          this.refreshTable();
        }
      }
      // if (result === 0) {
      //   console.log('terminated');
      // }
    });
  }

  projectList(teamName: string, projectName: string) {
    // this.isExpand = true;
    // console.log(this.isExpand);
    this.teamdetailArray = [];
    this.teamNameService.getExpextedData(teamName, projectName)
      .subscribe(data => {
        this.iterationData = JSON.parse(data);
        const iterationPath = Object.keys(this.iterationData[1]);
        console.log('itr' + iterationPath[1]);
        for (let i = 0; i < iterationPath.length; i++) {
          this.teamdetailArray.push(this.iterationData[1][iterationPath[i]]);
          //  console.log(this.iterationData[1][iterationPath[i]]);
        }
        console.log('this.teamdetailArray' + this.teamdetailArray[1]);
        this.dataSource2 = new MatTableDataSource(this.teamdetailArray);

      });
  }

  delete(index) {
    const action = confirm(' Sure want to delete \n Team Name :'
      + this.users[index].name + '\n Project Name ' + this.users[index].project_name + '?');
    if (action) {
      this.users.splice(index, 1);
      this.refreshTable();
    }
  }
}
