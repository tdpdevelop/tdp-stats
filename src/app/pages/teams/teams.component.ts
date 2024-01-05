import { Component } from '@angular/core';
import { LeagueService } from './../../services/league.service';
import { TeamService }   from './../../services/team.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {

  public leagues        : any[] = [];
  public teams          : any[] = [];
  public selectedLeague : any   = {};
  public selectedTeam   : any   = {}; 

  constructor(
    private leagueService : LeagueService,
    private teamsService  : TeamService
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

  public onLeagueSelected( event : any ){
    this.teamsService
      .getTeamsByLeagueId(event.value.id)
      .pipe(first())
      .subscribe(
        ( result : any ) => {
          console.log(result)
          this.teams = result;
        },
        ( error  : any ) =>{}
      )
  }

}
