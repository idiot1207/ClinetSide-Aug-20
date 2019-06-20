import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import{HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})


export class TeamnameService {

  constructor(private http:HttpClient) { }

  areaPath;

  getTeamName():Observable<any>
  {
    return this.http.get('http://localhost:55836/api/TFS/GetAllTeamName');
  }

  getExpextedDatas(TeamNmae ,ProjectName):Observable<any>
  {
    var areaPath1=btoa("ProjectOne\\"+TeamNmae+"\\"+ProjectName)

    var areaPath=btoa("ProjectOne\\Team Summer\\AreaPathOne")
  
   // console.log(areaPath);
    console.log(areaPath1);
    console.log(areaPath);

    return this.http.get('http://localhost:55836/api/TFS/postRequest/'+areaPath1);
  }

}
