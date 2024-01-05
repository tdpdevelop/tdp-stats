import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private url : string = "http://localhost:8081/api/leagues";

  constructor(private http: HttpClient) { } 

  public getAllLeagues(): Observable<Array<any>> {
    return this.http.get<Array<any>>( 
      `${this.url}/`
    ); 
  }

  public insertLeague( json : any ): Observable<any> {
    return this.http.post<any>(
      `${this.url}/`,
      json
    );
  }

}