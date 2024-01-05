import { Component } from '@angular/core';
import { LeagueService } from './../../services/league.service';
import { TeamService } from './../../services/team.service';
import { first } from 'rxjs/operators';
import { Router        } from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.css'
})
export class CreateTeamComponent {

  public teamName       : string = "";
  public selectedLeague : any   = {};
  public leagues        : any[] = [];

  constructor(
    private leagueService : LeagueService,
    private teamService   : TeamService,
    private router        : Router
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

  public saveTeam(){
    if ( this.teamName != "" ){
      let json : any = {
        id   : 0,
        name : this.teamName,
        id_league : this.selectedLeague.id
      }
      this.teamService
        .insertTeam(json)
        .pipe(first())
        .subscribe(
          ( result : any ) => {
            this.router.navigate(['/teams']);
          },
          ( error  : any ) =>{}
        )
      }
  }

}
