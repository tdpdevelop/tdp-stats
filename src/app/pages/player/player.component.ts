import { Component } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent {

  public playerStats : any   = {};
  public playerData  : any[] = [];

  constructor(){
    this.playerStats = {
      id       : 1,
      name     : 'Rodolfo Soto Figueroa',
      age      : 28,
      position : 'Pivot',
      jersey_n : 36,
      in_game  : true,
      rebounds : 0,
      points   : 0,
      assists  : 0,
      doubles  : 0,
      three    : 0,
      gen_at   : 0,
      doubles_at  : 0,
      three_at    : 0,
      general_percent : "0%",
      three_percent   : "0%",
      double_percent  : "0%",
      minutes_played  : 0,
      photo : "./../../../assets/images/profile.png"
    }

    this.playerData.push(
      {
        item  : 'Full name',
        value : this.playerStats.name 
      },
      {
        item  : 'Age',
        value : this.playerStats.age 
      },
      {
        item  : 'Position',
        value : this.playerStats.position 
      },
      {
        item  : 'N°',
        value : this.playerStats.jersey_n 
      },
      {
        item  : 'Points',
        value : this.playerStats.points 
      },
      {
        item  : '2 point',
        value : this.playerStats.doubles 
      },
      {
        item  : '3 point',
        value : this.playerStats.three 
      },
      {
        item  : 'Score percent',
        value : this.playerStats.general_percent 
      },
      {
        item  : '3 point percent',
        value : this.playerStats.three_percent 
      },
      {
        item  : '2 point percent',
        value : this.playerStats.double_percent 
      },
      {
        item  : 'Minutes played',
        value : this.playerStats.minutes_played 
      },
      
    );
      
  }

}
