import { Component, OnInit } from '@angular/core';
import {TeamnameService} from './Service/teamname.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userName:string
  sessionTime = new Date();
  sessionTimeout;
  ngOnInit() {
    this.userName=localStorage.getItem('userName');
    console.log(localStorage.getItem('userName'));
    this.sessionTime.setMinutes(this.sessionTime.getMinutes() + 30);
    this.sessionTimeout = formatDate(this.sessionTime, 'MM/dd/yyyy hh:mm:ss', 'en-US');
    console.log("Local Storage "+localStorage.getItem('loggedInTime'));
    console.log('sesssionTimeout '+this.sessionTimeout);
    if(Date.parse(localStorage.getItem('loggedInTime')) >= Date.parse(this.sessionTimeout))
    {
      this.LogOut();
    }
  }
  constructor(private teamnameService: TeamnameService, private router: Router) {
  this.teamnameService.isLoggedIn = localStorage.getItem('accessToken') == null ? false : true;
  }
  importData(){
   
  }

  

  LogOut(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('loggedInTime');
    this.teamnameService.isLoggedIn=false;
    this.router.navigate(['/loginpage']);
  }
}
