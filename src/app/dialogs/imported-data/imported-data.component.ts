import { Component, OnInit, Inject } from '@angular/core';
import { TeamDetails } from 'src/app/modals/productData';
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import{ TeamnameService} from '../../Service/teamname.service'

@Component({
  selector: 'app-imported-data',
  templateUrl: './imported-data.component.html',
  styleUrls: ['./imported-data.component.css']
})
export class ImportedDataComponent implements OnInit {

  constructor(
                public dialog: MatDialog,
                private http: HttpClient,
                public dialogRef: MatDialogRef<ImportedDataComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private team_name_service:TeamnameService,
              ){ }
              

  ngOnInit() {
          this.team_name_service.getTeamName()
          .subscribe(datas => {
            //datas is coming in string format so we need to parse it to JSON format
            this.team_names=JSON.parse(datas); 
            // console.log(this.team_names);
            });
          }

  selected_teamname :'';
  selected_project :'';
  team_names : [];
  project_names:[];

  getTeamDetail() {
    this.team_name_service.getTeamName()
    .subscribe(data => {
     this.team_names=data;
      console.log(this.team_names);
    });
  } 

    //getting project details
  getProjectDetails(){
    console.log('2nd tym'+this.selected_teamname);
    return this.http.get<TeamDetails[]>('http://localhost:55836/api/TFS/GetTeamProject/'+this.selected_teamname);
  }
  getProjectDetail(){
    this.getProjectDetails()
    .subscribe((data:any) => {
    this.project_names= JSON.parse(data);
    console.log(this.project_names)
    });
  }

  getExpextedData()
  {
    this.team_name_service.getExpextedDatas(this.selected_teamname,this.selected_project)
    .subscribe(data => {
       console.log(data);
     });
  }

  importNewTeam(){
    this.data.name=this.selected_teamname;
    this.data.project_name=this.selected_project;
    this.dialogRef.close(this.data);
    this.getExpextedData();
    
  }

  cancel(){
    this.dialogRef.close(0);
  }

}
