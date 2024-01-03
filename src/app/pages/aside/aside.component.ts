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
                  },
                  {
                      label: 'Agregar Liga',
                      icon: 'pi pi-fw pi-plus-circle'
                  }
              ]
          },
          {
              label: 'Equipos',
              icon: 'pi pi-fw pi-sitemap',
              items: [
                  {
                      label: 'Ver equipo',
                      icon: 'pi pi-fw pi-eye'
                  },
                  {
                      label: 'Asignar equipo',
                      icon: 'pi pi-fw pi-plus'
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

}
