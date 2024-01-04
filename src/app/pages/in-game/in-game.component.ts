import { Component, ViewChild, ElementRef,AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-in-game',
  templateUrl: './in-game.component.html',
  styleUrl: './in-game.component.css'
})
export class InGameComponent implements AfterViewInit, OnInit{
  @ViewChild('myCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  //-- Cuartos
  public period      : string = "1";

  //-- Nombres de los equipos
  public homeName    : string = "TEAM A";
  public awayName    : string = "TEAM B";

  //-- Tiempo
  public timerMin    : string = "10";
  public timerSec    : string = "00";

  //-- Marcador
  public homeGoals   : string = "00";
  public awayGoals   : string = "00";

  //-- Otros
  public overtime    : number = 0;
  public inGameStart : boolean = false;
  private lastMinute : boolean = true;
  private endQuarter : boolean = false;
  public homePlayers : any[] = [
    {
      id : 1,
      name : 'Player 1',
      in_game : true
    },
    {
      id : 2,
      name : 'Player 2',
      in_game : true
    },
    {
      id : 3,
      name : 'Player 3',
      in_game : false
    },
    {
      id : 4,
      name : 'Player 4',
      in_game : true
    },
    {
      id : 5,
      name : 'Player 5',
      in_game : true
    },
    {
      id : 6,
      name : 'Player 6',
      in_game : false
    },
    {
      id : 7,
      name : 'Player 7',
      in_game : false
    },
    {
      id : 8,
      name : 'Player 8',
      in_game : true
    },

  ];
  public awayPlayers : any[] = [
    {
      id : 1,
      name : 'Player 1',
      in_game : false
    },
    {
      id : 2,
      name : 'Player 2',
      in_game : true
    },
    {
      id : 3,
      name : 'Player 3',
      in_game : false
    },
    {
      id : 4,
      name : 'Player 4',
      in_game : true
    },
    {
      id : 5,
      name : 'Player 5',
      in_game : false
    },
    {
      id : 6,
      name : 'Player 6',
      in_game : true
    },
    {
      id : 7,
      name : 'Player 7',
      in_game : true
    },
    {
      id : 8,
      name : 'Player 8',
      in_game : true
    },

  ];

  ngOnInit(){

    setInterval( () => {
      if ( this.inGameStart == true ){

        if ( this.lastMinute == true ){
          if ( parseInt(this.timerMin) == 0 && parseInt(this.timerSec) == 0 ){
            this.inGameStart = false;
            this.timerMin    = "10";
            this.timerSec    = "00";

            this.period = (parseInt(this.period) + 1) + "";

            this.endQuarter = true;
          }
        }
        if ( this.endQuarter == false ){
          if ( this.timerSec != "00" ){
            this.timerSec = (parseInt(this.timerSec) - 1) + "";

            if ( this.timerSec == "0" ){
              this.timerSec = "00";
            }

            if ( parseInt(this.timerSec) < 10 && this.timerSec.length < 2 ){
              this.timerSec = "0" + this.timerSec;
            }
          }
          else{
            this.timerMin = (parseInt(this.timerMin) - 1) + "";

            if ( parseInt(this.timerMin) < 10 ){
              this.timerMin = "0" + this.timerMin;
            }

            if ( parseInt(this.timerMin) == 0 && parseInt(this.timerSec) == 0 ){
              this.lastMinute = true;            
            }
            else{
              this.timerSec = "59";
            }
            
          }
        }
          
      }        
    }, 1000)
  }


  ngAfterViewInit(): void {
    this.canvas.nativeElement.addEventListener('click', (event) => {
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      ctx.fillStyle = 'red'; // Cambia aquí por el color deseado
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2); // Cambia el radio si deseas cambiar el tamaño del círculo
      ctx.fill();
      ctx.closePath();

      console.log(`Coordenada X: ${x}, Coordenada Y: ${y}`);
    });

    const ctx = this.canvas.nativeElement.getContext('2d')!;
    const imagePath = 'assets/images/image.png'; // Ruta relativa desde el archivo TypeScript

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    };

    img.src = imagePath;

  }

  playGame(){
    this.inGameStart = true;
    this.endQuarter  = false;
  }
  pauseGame(){
    this.inGameStart = false;
  }
}
