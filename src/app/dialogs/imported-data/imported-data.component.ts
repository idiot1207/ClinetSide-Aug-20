import { Component, OnInit, Inject } from '@angular/core';
import { TeamDetails } from 'src/app/modals/productData';
import { MatDialog } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { TeamnameService } from '../../Service/teamname.service';

@Component({
  selector: 'app-imported-data',
  templateUrl: './imported-data.component.html',
  styleUrls: ['./imported-data.component.css']
})
export class ImportedDataComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ImportedDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeamDetails,
    private teamNameService: TeamnameService,
  ) { }

  selectedTeamname: '';
  selectedProject: '';
  teamNames: [];
  projectNames: [];
  expectedData: any;


  ngOnInit() {
    console.log('inisde ng int');
    if (this.teamNameService.isLoggedIn === false) {
      this.dialogRef.close(0);
    }
    this.teamNameService.getTeamName()
      .subscribe(datas => {
        // console.log(datas);
        // datas is coming in string format so we need to parse it to JSON format
        this.teamNames = JSON.parse(datas);
        // console.log(this.team_names);
      });

    console.log('inisde ng onlint');
    async function myAwesomeFunction() {

      setTimeout(() => 'vinoth', 1000);
    }

    const result = myAwesomeFunction();

  }

  getTeamDetail() {
    this.teamNameService.getTeamName()
      .subscribe(data => {
        this.teamNames = data;
      });
  }

  getProjectDetail() {
    this.teamNameService.getProjectName(this.selectedTeamname)
      .subscribe((data: any) => {
        this.projectNames = JSON.parse(data);
       // console.log('inside get project details' + typeof this.projectNames);
       // console.log('project data' + this.projectNames);
      });
  }


  // getReleaseList(){
  // code to be written for release list

  // }

  getProjectList() {

    this.teamNameService.getExpextedData(this.selectedTeamname, this.selectedProject)
      .subscribe(datas => {
        // console.log('datas ' + datas);
        this.expectedData = JSON.parse(datas);
       // console.log('hi' + this.expectedData[0]['TargetFeaturePoint']);
        //  console.log('Hiii '+this.expectedData[1]['ProjectOne\\Sprint 2']);
      });
  }


  importNewTeam() {
    this.data.name = this.selectedTeamname;
    this.data.project_name = this.selectedProject;
    this.data.target_fps = this.expectedData[0]["TargetFeaturePoint"];
    this.data.fp_closed = this.expectedData[0]["ClosedFeaturePoint"];
    this.data.target_sps = this.expectedData[0]["TargetStoryPoint"];
    this.data.sp_closed = this.expectedData[0]["ClosedStoryPoint"];
    this.data.bugs_raised = this.expectedData[0]['BugRaised'];
    this.data.bugs_closed = this.expectedData[0]["BugClosed"];
    console.log('Expected data' + this.expectedData[1]);
    const key = 'iterationData';
    this.data[key] = this.expectedData[1];
    this.dialogRef.close(this.data);
    console.log(this.data);
  }

  cancel() {
    this.dialogRef.close(0);
  }

}

