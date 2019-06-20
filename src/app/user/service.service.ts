import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct, TeamDetails } from '../modals/productData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  //private readonly API_URL_TEAMNAMES = 'http://localhost:3000/team_names';
  //private readonly API_URL_POJECT ='http://localhost:3000/team_names';

  constructor(private http: HttpClient) {}

  // getTeamDetails(): Observable<TeamDetails[]> {
  // //  return this.http.get<TeamDetails[]>(this.API_URL_TEAMNAMES);
  //   } 

  }
  // getUsers() {
  //   return this.http.get(this.API_URL_TEAMNAMES);
    
  // }

  // setUser(user) {
  //   let userId = user.id;
  //   delete user.id;
  //   return this.http.post('https://jsonplaceholder.typicode.com/users/${user.id}', user);
  // }

// addItem(iproduct:IProduct){console.log("inside add item");}
