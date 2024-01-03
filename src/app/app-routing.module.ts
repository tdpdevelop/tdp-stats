import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AsideComponent } from './pages/aside/aside.component';
import { InGameComponent } from './pages/in-game/in-game.component'

const routes: Routes = [
  {
    path : '',
    component : AsideComponent,
    children : [
      {
        path : 'home',
        component : HomeComponent
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
