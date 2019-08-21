import { Component } from '@angular/core';
import { ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { MatSort, Sort } from '@angular/material';
import { MatPaginator, PageEvent, MatTableDataSource } from '@angular/material';
import { fromMatSort, sortRows, vinoth } from './datasource-utils';
import { fromMatPaginator, paginateRows } from './datasource-utils';
import { ImportedDataComponent } from '../dialogs/imported-data/imported-data.component';
import { TeamnameService } from '../Service/teamname.service';

@Component({
  selector: 'app-output-datatable',
  templateUrl: './output-datatable.component.html',
  styleUrls: ['./output-datatable.component.css']
})
export class OutputDatatableComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedRows$: Observable<ShipData[]>;
  displayedRows1$: Observable<TeamDetails[]>;
  totalRows$: Observable<number>;
  users: TeamDetails[] = [];
  iterationData;
  iterationPath;
  iterationDatas = [[], []];
  displayedColumns: string[] = ['itertaionName', 'startDate', 'finishDate', 'targetFP', 'fpClosed', 'targetSP',
    'spClosed', 'bugsRaised', 'bugsClosed'];
  dataSource;
  index = 0;

  ngOnInit() {
    this.iterationDatas = [[], []];
   // this.refreshTable();
  }

  constructor(
    public dialog: MatDialog,
    private teamNameService: TeamnameService,
  ) { }

  delete(index) {
    let action = confirm(' Sure want to delete \n Team Name :'
      + this.users[index].name + '\n Project Name ' + this.users[index].project_name + '?');
    if (action) {
      this.index--;
      this.users.splice(index, 1);
      this.iterationDatas.splice(index,1);
      this.refreshTable();
    }
  }
  importData() {
    const dialogRef = this.dialog.open(ImportedDataComponent, {
      height: '490px',
      width: '500px',
      disableClose: true,
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      // if (result !== 0) {
      let count = 0;
      let key = 'iterationData';
      this.iterationData = result[key];
      console.log('iteration data' + this.iterationData);
      const iterationPath = Object.keys(this.iterationData);

      for (let i = 0; i < Object.keys(this.users).length; i++) {

        if (this.users[i].project_name === result.project_name) {
          alert('sdd');
          count++;

        }
      }
      if (count === 0) {
        console.log('length' + Object.keys(this.users).length);

        for (let i = 0; i < iterationPath.length; i++) {
          console.log(this.iterationData[iterationPath[i]]);
          console.log(this.index);
          console.log(this.iterationDatas);
          this.iterationDatas[this.index].push(this.iterationData[iterationPath[i]]);
        }
        this.index++;
        //  this.dataSource = new MatTableDataSource(this.iterationDatas);
        console.log('Result testing' + result['iterationData']);
        this.users.push(result);
        this.refreshTable();
      }
      // }
      // if (result === 0) {
      //   console.log('terminated');
      // }
    });
  }

  public refreshTable() {
    console.log('page is loading');
    const sortEvents$: Observable<Sort> = fromMatSort(this.sort);
    const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
    const rows$ = of(this.users);
    this.totalRows$ = rows$.pipe(map(rows => rows.length));
    this.displayedRows1$ = rows$.pipe(sortRows(sortEvents$), paginateRows(pageEvents$));
   // this.displayedRows$ = rows$.pipe(vinoth());
    //  this.dataSource = new MatTableDataSource(this.iterationDatas);
    this.users = this.users;
    console.log('after splice' + this.users);
    this.sort = this.sort;
    this.paginator = this.paginator;
  }

}

export interface ShipData {
  vesselId: string;
  vesselName: string;
  ircs?: string;
  countryCode: string;
  vesselStatus: string;
  grossTonnage?: number;
  hullNumber?: string;
  vesselType: string;
  jonesActEligible: boolean;
  disabledDate?: string;
}

export interface TeamDetails {
  Sr_no: number;
  name: string;
  project_name: string;
  release: string;
  project_status: string;
  target_fps: string;
  fp_closed: string;
  target_sps: string;
  sp_closed: string;
  bugs_raised: string;
  bugs_closed: string;
}
export const users: TeamDetails[] = [];
export const exampleShip: ShipData[] = [
  {
    'ircs': 'V7QV6',
    'vesselName': 'KYOWA ORCHID',
    'countryCode': 'US',
    'vesselId': 'IMO8675368',
    'vesselStatus': 'S',
    'grossTonnage': 1,
    'hullNumber': undefined,
    'vesselType': 'A21',
    'jonesActEligible': false,
    'disabledDate': undefined
  },
  {
    'ircs': 'WECH',
    'vesselName': 'MANULANI',
    'countryCode': 'US',
    'vesselId': 'IMO8675370',
    'vesselStatus': 'S',
    'grossTonnage': 1,
    'hullNumber': undefined,
    'vesselType': 'A21',
    'jonesActEligible': false,
    'disabledDate': undefined
  },
  {
    'ircs': 'WDB5483',
    'vesselName': 'FREEDOM',
    'countryCode': 'US',
    'vesselId': 'IMO8675382',
    'vesselStatus': 'S',
    'grossTonnage': 1,
    'hullNumber': undefined,
    'vesselType': 'A21',
    'jonesActEligible': false,
    'disabledDate': undefined
  },
  {
    'ircs': 'C6VT5',
    'vesselName': 'CORAL',
    'countryCode': 'BF',
    'vesselId': 'IMO8675394',
    'vesselStatus': 'S',
    'grossTonnage': 1,
    'hullNumber': undefined,
    'vesselType': 'A21',
    'jonesActEligible': false,
    'disabledDate': undefined
  },
  {
    'ircs': 'CQOD',
    'vesselName': 'AUTORACER',
    'countryCode': 'PO',
    'vesselId': 'IMO8675409',
    'vesselStatus': 'S',
    'grossTonnage': 1,
    'hullNumber': undefined,
    'vesselType': 'A21',
    'jonesActEligible': false,
    'disabledDate': undefined
  }
];
