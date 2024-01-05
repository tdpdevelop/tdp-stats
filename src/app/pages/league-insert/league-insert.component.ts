import { Component } from '@angular/core';
import { LeagueService } from './../../services/league.service';
import { first         } from 'rxjs/operators';
import { Router        } from '@angular/router';

@Component({
  selector: 'app-league-insert',
  templateUrl: './league-insert.component.html',
  styleUrl: './league-insert.component.css'
})
export class LeagueInsertComponent {

  public leagueName : string = "";

  constructor(
    private leagueService : LeagueService,
    private router        : Router
  ){
  }

  public saveLeague(){
    if ( this.leagueName != "" ){
      let json : any = {
        id   : 0,
        name : this.leagueName
      }
      this.leagueService
        .insertLeague(json)
        .pipe(first())
        .subscribe(
          ( result : any ) => {
            this.router.navigate(['/home']);
          },
          ( error  : any ) =>{}
        )
      }
  }

}
