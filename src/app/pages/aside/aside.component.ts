import { 
  Component,
  OnInit 
} from '@angular/core';
import { MenuItem  } from 'primeng/api';
import { Router    } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent implements OnInit {

  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
      this.items = [
          {
              label: 'Ligas',
              icon: 'pi pi-fw pi-align-justify',
              items: [
                  {
                      label: 'Ver ligas',
                      icon: 'pi pi-fw pi-eye',
                      command: () => this.leagues() 
                  },
                  {
                      label: 'Agregar Liga',
                      icon: 'pi pi-fw pi-plus-circle',
                      command: () => this.leaguesInsert()
                  }
              ]
          },
          {
              label: 'Equipos',
              icon: 'pi pi-fw pi-sitemap',
              items: [
                  {
                      label: 'Ver equipos',
                      icon: 'pi pi-fw pi-eye',
                      command: () => this.teams()
                  },
                  {
                      label: 'Agregar equipo',
                      icon: 'pi pi-fw pi-plus',
                      command: () => this.createTeam()
                  }
              ]
          },
          {
              label: 'Jugadores',
              icon: 'pi pi-fw pi-users',
              items: [
                  {
                      label: 'Agregar jugadores',
                      icon: 'pi pi-fw pi-user-plus'
                  },
                  {
                      label: 'Ver jugadores',
                      icon: 'pi pi-fw pi-users'
                  },
              ]
          },
          {
              label: 'Game',
              icon: 'pi pi-fw pi-users',
              command: () => this.inGame() 
          },
      ];
  }

  private inGame(): void {
    this.router.navigate(['/in-game']); // Navegar a la ruta '/ver-ligas'
  }

  private leagues(): void {
    this.router.navigate(['/home']); // Navegar a la ruta '/ver-ligas'
  }

  private leaguesInsert(): void {
    this.router.navigate(['/league-insert']); // Navegar a la ruta '/ver-ligas'
  }

  private teams(): void {
    this.router.navigate(['/teams']); // Navegar a la ruta '/ver-ligas'
  }

  private createTeam(): void {
    this.router.navigate(['/create-team']); // Navegar a la ruta '/ver-ligas'
  }

}
