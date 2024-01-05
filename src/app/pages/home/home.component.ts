import { Component } from '@angular/core';
import { LeagueService } from './../../services/league.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public leagues : any[] = [];

  constructor(
    private leagueService : LeagueService,
  ){
    this.getAllLeagues();
  }

  private getAllLeagues(){
    this.leagueService
      .getAllLeagues()
      .pipe(first())
      .subscribe(
        ( result : any ) => {
          this.leagues = result;
        },
        ( error  : any ) =>{}
      )
  }
}
