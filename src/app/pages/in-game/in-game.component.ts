import { Component, ViewChild, ElementRef,AfterViewInit, OnInit } from '@angular/core';


@Component({
  selector: 'app-in-game',
  templateUrl: './in-game.component.html',
  styleUrl: './in-game.component.css'
})
export class InGameComponent implements AfterViewInit, OnInit{
  @ViewChild('myCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  public gameJsonArray : any[] = [];

  //-- Cuartos
  public period      : string = "1";

  public twentyFour  : string = "24";

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

  public scoreModal  : boolean = false;
  public playerData  : any[] = [];
  public homePlayers : any[] = [
    {
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
      minutes_played  : 0
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

  ];
  public awayPlayers : any[] = [
    {
      id : 6,
      name : 'Player 1',
      in_game : false
    },
    {
      id : 7,
      name : 'Player 2',
      in_game : true
    },
    {
      id : 8,
      name : 'Player 3',
      in_game : false
    },
    {
      id : 9,
      name : 'Player 4',
      in_game : false
    },
    {
      id : 10,
      name : 'Player 5',
      in_game : false
    },
  ];

  public ballInOptions : any[] = [{label: "Scores", value: "scores" }, {label: "Ball out", value: 'ballout'}];

  public ballInOption  : string = "scores";

  public teamsOptions  : any[] = [{label: this.homeName, value: 'home' }, {label: this.awayName, value: 'away'}];

  public scoreTeam     : string = "home";

  public scoreOptions  : any[] = [{label: "3 pts.", value: 3 }, {label: "2 pts.", value: 2 }, {label: "1 pt.", value: 1 }];

  public scoreOption   : string = "2";

  public scorePlayer   : any = {};

  public extraShot     : boolean = false;

  private x : number = 0;
  private y : number = 0;

  public playerInfo : boolean = false;

  public selectedPlayer : any = {};

  ngOnInit(){

    setInterval( () => {
      if ( this.inGameStart == true ){

        //--
        this.twentyFour = (parseInt(this.twentyFour) - 1) + "";

        if ( parseInt(this.twentyFour) == 0 ){
          this.inGameStart = false;
          this.twentyFour  = "24"; 
        }

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
              this.timerSec = "59";      
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

      this.x = x;
      this.y = y;
      this.scores( x, y);
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

  public scores( x : any, y : any ){
    this.scoreModal = true;
    

    console.log(`Coordenada X: ${x}, Coordenada Y: ${y}`);
  }

  public setScorePlayer( player : any ){
    this.scorePlayer = player;
  }

  public saveInPlayData(){

    const ctx = this.canvas.nativeElement.getContext('2d')!;
    let jsonData = {};
    let color    = '';
    if ( this.scoreTeam == "home" ){
      color = "#42579E";
    }
    else{
      color = '#FF914D';
    }
    if ( this.ballInOption == "scores" ){

      ctx.fillStyle = color; // Cambia aquí por el color deseado
      ctx.beginPath();
      ctx.arc(this.x, this.y, 5, 0, Math.PI * 2); // Cambia el radio si deseas cambiar el tamaño del círculo
      ctx.fill();
      ctx.closePath();

      jsonData = {
        action    : 'score_action',
        team      : this.scoreTeam,
        addition  : this.scoreOption,
        player_id : this.scorePlayer.id,
        extra     : this.extraShot,
        scores    : true
      }

      this.changeScore( parseInt(this.scoreOption), this.scoreTeam );
      
    }
    else{
      // Tamaño de la "x"
      const size = 5; // Cambia el tamaño de la "x" si lo deseas

      // Color de la "x"
      ctx.fillStyle = color; // Cambia aquí por el color deseado

      // Dibujar la "x"
      ctx.beginPath();
      ctx.moveTo(this.x - size, this.y - size);
      ctx.lineTo(this.x + size, this.y + size);
      ctx.moveTo(this.x + size, this.y - size);
      ctx.lineTo(this.x - size, this.y + size);
      ctx.stroke();
      ctx.closePath();

      jsonData = {
        action    : 'score_action',
        team      : this.scoreTeam,
        addition  : this.scoreOption,
        player_id : this.scorePlayer.id,
        extra     : this.extraShot,
        scores    : false
      }
    }

    this.updatePlayerData(parseInt(this.scoreOption), this.ballInOption, this.scoreTeam, this.scorePlayer.id);

    this.gameJsonArray.push(jsonData);
    this.scoreModal = false;

    this.cleanData();
    
  }

  private updatePlayerData( points : number, scores : string , scoreTeam : string, player_id : number ){

    if ( scoreTeam == "home" ){
      for ( let i = 0 ; i < this.homePlayers.length ; i ++ ){
        if ( player_id == this.homePlayers[i].id ){
          if ( scores == "scores" ){
            this.homePlayers[i].points += points;
            if ( points == 2 ){
              this.homePlayers[i].doubles += 2;

            }
            else if ( points == 3 ){
              this.homePlayers[i].three  += 3;
            }
          }
          if ( points == 2 ){
            this.homePlayers[i].doubles_at += 2; 
            this.homePlayers[i].gen_at     += 2; 
            this.homePlayers[i].double_percent  = this.getPercent(this.homePlayers[i].doubles, this.homePlayers[i].doubles_at) + "%";
            this.homePlayers[i].general_percent = this.getPercent(this.homePlayers[i].points, this.homePlayers[i].gen_at) + "%";
          }
          else if ( points == 3 ){
            this.homePlayers[i].three_at += 3; 
            this.homePlayers[i].gen_at   += 3; 
            this.homePlayers[i].three_percent   = this.getPercent(this.homePlayers[i].three, this.homePlayers[i].three_at) + "%";
            this.homePlayers[i].general_percent = this.getPercent(this.homePlayers[i].points, this.homePlayers[i].gen_at) + "%";
          }

        }
      }
    }
    else{

    }
  }

  private getPercent( total : number, attempted : number ){
    let percent = (total/attempted) * 100;

    return percent;
  }

  private changeScore( addition : number, team : string ){
    if ( team == "home" ){
      this.homeGoals = (parseInt(this.homeGoals) + addition) + "";
      if ( parseInt(this.homeGoals) < 10 ){
        this.homeGoals = "0" + this.homeGoals;
      }
    }

    else if ( team == "away" ){
      this.awayGoals = (parseInt(this.awayGoals) + addition) + "";
      if ( parseInt(this.awayGoals) < 10 ){
        this.awayGoals = "0" + this.awayGoals;
      }
    }
  }

  private cleanData(){
    this.ballInOption = "scores";
    this.scoreTeam    = "home";
    this.scoreOption  = "";

    this.scorePlayer  = {};
    this.extraShot    = false;
  }

  public showPlayer( player : any ){
    this.playerData     = [];
    this.playerInfo     = true;
    this.selectedPlayer = player;

    this.playerData.push(
      {
        item  : 'Full name',
        value : player.name 
      },
      {
        item  : 'Age',
        value : player.age 
      },
      {
        item  : 'Position',
        value : player.position 
      },
      {
        item  : 'N°',
        value : player.jersey_n 
      },
      {
        item  : 'Points',
        value : player.points 
      },
      {
        item  : '2 point',
        value : player.doubles 
      },
      {
        item  : '3 point',
        value : player.three 
      },
      {
        item  : 'Score percent',
        value : player.general_percent 
      },
      {
        item  : '3 point percent',
        value : player.three_percent 
      },
      {
        item  : '2 point percent',
        value : player.double_percent 
      },
      {
        item  : 'Minutes played',
        value : player.minutes_played 
      },
      
    );


  }

  public resetTF( num : string ){
    this.twentyFour = num;
  }
}







