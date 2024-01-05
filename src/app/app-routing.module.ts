import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent   } from './pages/home/home.component';
import { AsideComponent  } from './pages/aside/aside.component';
import { InGameComponent } from './pages/in-game/in-game.component';
import { LeagueInsertComponent } from './pages/league-insert/league-insert.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { CreateTeamComponent } from './pages/create-team/create-team.component';

const routes: Routes = [
  {
    path : '',
    component : AsideComponent,
    children : [
      {
        path : 'home',
        component : HomeComponent
      },  
      {
        path : 'league-insert',
        component : LeagueInsertComponent
      }, 
      {
        path : 'teams',
        component : TeamsComponent
      },  
      {
        path : 'create-team',
        component : CreateTeamComponent
      },      
    ]
  },
  {
    path : 'in-game',
    component : InGameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
