import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParameterCodec, HttpParams } from '@angular/common/http';

export class CustomURLEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(key: string): string {
    return encodeURIComponent(key);
  }
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }
  decodeValue(key: string) {
    return decodeURIComponent(key);
  }
}
@Injectable({
  providedIn: 'root'
})


export class TeamnameService {
  areaPath;
  isLoggedIn: boolean;
  constructor(private http: HttpClient) {
  }
  getTeamName(): Observable<any> {
    return this.http.get('http://localhost:55836/api/TFS/GetAllTeamName',
    );
  }
  getProjectName(teamName): Observable<any> {
    return this.http.get('http://localhost:55836/api/TFS/GetTeamProject/' + teamName,
    );
  }
  getExpextedData(TeamName, ProjectName): Observable<any> {
    const areaPath1 = encodeURI('ProjectOne\\' + TeamName + '\\' + ProjectName);
    return this.http.get('http://localhost:55836/api/TFS/post/t?AreaPath=' + areaPath1,
    );
  }
  getToken(username, password) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'
      })
    };
    // const formData = new FormData();
    const body = new HttpParams({ encoder: new CustomURLEncoder() })
      .set('username', '' + (username))
      .set('password', '' + (password))
      .set('grant_type', 'password');
    return this.http.post('http://localhost:55836/token', body.toString(), httpOptions);
  }
  getAllIteration(): Observable<any> {
    return this.http.get('http://localhost:55836/api/TFS/GetAllIterations',
    );
  }
  getAllIterationData(IterationPath, AreaPath): Observable<any> {
    console.log('Iteration Path ' + IterationPath);
    console.log('Area path ' + AreaPath);
    return this.http.get('http://localhost:55836/api/TFS/WorkItemsByIteration/' + btoa(IterationPath) + '/' + btoa(AreaPath),
    );
  }
}

