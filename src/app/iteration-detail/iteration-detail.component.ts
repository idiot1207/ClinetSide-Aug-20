import { Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource,MatTabGroup  } from '@angular/material';
import { TeamnameService } from '../Service/teamname.service';
@Component({
  selector: 'app-iteration-detail',
  templateUrl: './iteration-detail.component.html',
  styleUrls: ['./iteration-detail.component.css'],
  animations: [
    trigger('Expand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class IterationDetailComponent implements OnInit {
  columnsToDisplay = ['actions', 'name'];
  projectColumns = ['project_Name'];
  links = ['First', 'Second', 'Third', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth', 'ten', 'vinoth'];
  currentIterationName;
  projectExpandedElement: null;
  teamExpandedElement: null;
  teamDataSource;
  projectDataSource;
  teamNames: any;
  itreationsNames: any;
  projectName: any;
  iteationPath;
  areaPath;
  selectedTeamName;
  checkTeamName;
  checkProjectName;
  newuserStories;
  activeuserStories;
  resolveduserStories;
  closeduserStories;
  totaluserStories;
  selectedIndex ;

  constructor(
    private teamnameService: TeamnameService, private change: ChangeDetectorRef
  ) { }
  ngOnInit() {
    // getting list of Itertaions
    this.teamnameService.getAllIteration()
      .subscribe(data => {
        let i = 0;
        data = JSON.parse(data);
        this.itreationsNames = data.value;
        // console.log(data);
        this.currentIterationName = data.currentIteration;
        for (i = 0; i < this.itreationsNames.length; i++) {
         if ( this.currentIterationName === this.itreationsNames[i].name) {
          this.iteationPath = this.itreationsNames[i].path;
          this.selectedIndex = i;
          this.change.markForCheck();
         }
        }

        // Getting list team names
        this.teamnameService.getTeamName()
          // tslint:disable-next-line: no-shadowed-variable
          .subscribe(data => {
            // data is coming in string format so we need to parse it to JSON format
            data = JSON.parse(data);
            this.teamNames = data[0].value;
            this.teamDataSource = new MatTableDataSource(this.teamNames);
          });
      });
  }

  teamExpansion(teamName) {
    this.selectedTeamName = teamName;
    if (this.checkTeamName !== teamName) {
      // getting list of project name by team name
      this.teamnameService.getProjectName(teamName)
        .subscribe(data => {
          data = JSON.parse(data);
          this.projectName = data;
          this.projectDataSource = new MatTableDataSource(data);
          this.checkTeamName = teamName;
        });
    }
  }

  projectExpansion(projectName) {
    this.areaPath = 'ProjectOne\\' + this.selectedTeamName + '\\' + projectName;
    if (this.checkProjectName !== projectName) {
      // getting workItems details by passing areaPath and iteration Path
      this.teamnameService.getAllIterationData(this.iteationPath, this.areaPath)
        .subscribe(data => {
          this.checkProjectName = projectName;
          data = JSON.parse(data);
          this.totaluserStories = data.newStoryPoint + data.activeStoryPoint + data.resolvedStoryPoint + data.ClosedStoryPoint;
          this.newuserStories = data.newStoryPoint !== 0 ? data.newStoryPoint * 100 / this.totaluserStories : 0;
          this.activeuserStories = data.activeStoryPoint !== 0 ? data.activeStoryPoint * 100 / this.totaluserStories : 0;
          this.resolveduserStories = data.resolvedStoryPoint !== 0 ? data.resolvedStoryPoint * 100 / this.totaluserStories : 0;
          this.closeduserStories = data.ClosedStoryPoint !== 0 ? data.ClosedStoryPoint * 100 / this.totaluserStories : 0;
        });
    }
  }

  iteration(iterationPath) {
    let i = 0;
    for ( i = 0 ; i < this.itreationsNames.length; i++) {
      if ( i === iterationPath.index) {
            this.iteationPath = this.itreationsNames[i].path;
          }
    }
    this.projectExpandedElement = null;
    this.teamExpandedElement = null;
  }

}


