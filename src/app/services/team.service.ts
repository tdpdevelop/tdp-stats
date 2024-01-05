import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private url : string = "http://localhost:8081/api/teams";

  constructor(private http: HttpClient) { } 

  public getAllTeams(): Observable<Array<any>> {
    return this.http.get<Array<any>>( 
      `${this.url}/`
    ); 
  }

  public insertTeam( json : any ): Observable<any> {
    return this.http.post<any>(
      `${this.url}/`,
      json
    );
  }

  public getTeamsByLeagueId( id : number ): Observable<Array<any>> {
    return this.http.get<Array<any>>( 
      `${this.url}/league/${id}`
    ); 
  }

}