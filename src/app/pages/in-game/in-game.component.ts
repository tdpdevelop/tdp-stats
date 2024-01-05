import { Component, ViewChild, ElementRef,AfterViewInit, OnInit } from '@angular/core';

import { PlayersService } from './../../services/players.service'

import * as XLSX from 'xlsx';


@Component({
  selector: 'app-in-game',
  templateUrl: './in-game.component.html',
  styleUrl: './in-game.component.css'
})
export class InGameComponent implements AfterViewInit, OnInit{
  @ViewChild('myCanvas', { static: true }) canvas! : ElementRef<HTMLCanvasElement>;

  private idAux : number = 1;

  public homePlayersCharged : boolean = false;
  public awayPlayersCharged : boolean = false;

  public fileHome : File | undefined;
  public fileAway : File | undefined;

  public dataHome : any[] = [];
  public dataAway : any[] = [];

  public homeTeamName : string = "TOROS A";
  public awayTeamName : string = "THUNDER";

  public gameJsonArray : any[] = [];

  //-- Cuartos
  public period      : string = "1";

  public twentyFour  : string = "24";

  //-- Nombres de los equipos
  public homeName    : string = "TOROS A";
  public awayName    : string = "THUNDER";

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
  public playerStats : any[] = [];
  public homePlayers : any[] = [];
  public awayPlayers : any[] = [];

  public homePlayersInGame : any[]   = [];
  public awayPlayersInGame : any[]   = [];

  public subsVisibleHome   : boolean = false;
  public subsVisibleAway   : boolean = false;

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



  //-- timeout

  public timeoutTeam         : string  = ""
  public timeoutTimer        : string  = "60";
  public timeoutFlag         : boolean = false;
  public timeoutModalVisible : boolean = false;

  //-- fouls

  public homeFouls : any[] = [ { val : 0}, { val : 0}, { val : 0}, { val : 0}, { val : 0} ];
  public awayFouls : any[] = [ { val : 0}, { val : 0}, { val : 0}, { val : 0}, { val : 0} ];

  //-- position

  public possHome : boolean = false;
  public possAway : boolean = false;


  /* DRAG AND DROP */
  /* HOME */

  /* LEFT */

  public draggedPlayerLeft : any | undefined | null;

  dragStartLeft( player : any ) {
      this.draggedPlayerLeft = player;
  }

  dropLeft() {
    if ( this.homePlayersInGame.length < 5 ){
      if (this.draggedPlayerLeft) {
          let draggedPlayerLeftIndex = this.findIndexLeft(this.draggedPlayerLeft);
          this.homePlayersInGame = [...(this.homePlayersInGame as any[]), this.draggedPlayerLeft];
          this.homePlayers = this.homePlayers?.filter((val, i) => i != draggedPlayerLeftIndex);
          this.draggedPlayerLeft = null;
      }
    }
    else{
      this.dragEndLeft();
    }
      
  }

  dragEndLeft() {
      this.draggedPlayerLeft = null;
  }

  findIndexLeft( product : any) {
    let index = -1;
    for (let i = 0; i < (this.homePlayers as any[]).length; i++) {
        if (product.id === (this.homePlayers as any[])[i].id) {
            index = i;
            break;
        }
    }
    return index;
  }

  /* RIGHT */

  public draggedPlayerRight : any | undefined | null;

  dragStartRight( player : any ) {
      this.draggedPlayerRight = player;
  }

  dropRight() {
    if (this.draggedPlayerRight) {
        let draggedPlayerRightIndex = this.findIndexRight(this.draggedPlayerRight);

        this.homePlayers        = [...(this.homePlayers as any[]), this.draggedPlayerRight];
        this.homePlayersInGame  = this.homePlayersInGame?.filter((val, i) => i != draggedPlayerRightIndex);
        this.draggedPlayerRight = null;
    }
  }

  dragEndRight() {
      this.draggedPlayerRight = null;
  }

  findIndexRight( product : any) {
    let index = -1;
    for (let i = 0; i < (this.homePlayersInGame as any[]).length; i++) {
        if (product.id === (this.homePlayersInGame as any[])[i].id) {
            index = i;
            break;
        }
    }
    return index;
  }


  /* AWAY */
  /* LEFT */

  public draggedPlayerLeftAway : any | undefined | null;

  dragStartLeftAway( player : any ) {
      this.draggedPlayerLeftAway = player;
  }

  dropLeftAway() {
    if ( this.awayPlayersInGame.length < 5 ){
      if (this.draggedPlayerLeftAway) {
          let draggedPlayerLeftAwayIndex = this.findIndexLeftAway(this.draggedPlayerLeftAway);
          this.awayPlayersInGame = [...(this.awayPlayersInGame as any[]), this.draggedPlayerLeftAway];
          this.awayPlayers = this.awayPlayers?.filter((val, i) => i != draggedPlayerLeftAwayIndex);
          this.draggedPlayerLeftAway = null;
      }
    }
    else{
      this.dragEndLeftAway();
    }
      
  }

  dragEndLeftAway() {
      this.draggedPlayerLeftAway = null;
  }

  findIndexLeftAway( product : any) {
    let index = -1;
    for (let i = 0; i < (this.awayPlayers as any[]).length; i++) {
        if (product.id === (this.awayPlayers as any[])[i].id) {
            index = i;
            break;
        }
    }
    return index;
  }

  /* RIGHT */

  public draggedPlayerRightAway : any | undefined | null;

  dragStartRightAway( player : any ) {
      this.draggedPlayerRightAway = player;
  }

  dropRightAway() {
    if (this.draggedPlayerRightAway) {
        let draggedPlayerRightAwayIndex = this.findIndexRightAway(this.draggedPlayerRightAway);

        this.awayPlayers        = [...(this.awayPlayers as any[]), this.draggedPlayerRightAway];
        this.awayPlayersInGame  = this.awayPlayersInGame?.filter((val, i) => i != draggedPlayerRightAwayIndex);
        this.draggedPlayerRightAway = null;
    }
  }

  dragEndRightAway() {
      this.draggedPlayerRightAway = null;
  }

  findIndexRightAway( product : any) {
    let index = -1;
    for (let i = 0; i < (this.awayPlayersInGame as any[]).length; i++) {
        if (product.id === (this.awayPlayersInGame as any[])[i].id) {
            index = i;
            break;
        }
    }
    return index;
  }

  constructor(
    private playersService : PlayersService,
  ){
    this.homePlayers = this.playersService.getPlayersByTeamId(1);
    this.awayPlayers = this.playersService.getPlayersByTeamId(2);
  }

  ngOnInit(){

    setInterval( () => {

      if ( this.timeoutFlag == true ){
        if ( parseInt(this.timeoutTimer) > 0 ){
          this.timeoutTimer = ( parseInt(this.timeoutTimer) - 1 ) + "";
          
        }
        if ( parseInt(this.timeoutTimer) == 0 ){
          this.timeoutFlag  = false;
        }
      }
      if ( this.inGameStart == true ){

        //--
        if ( this.twentyFour != "--" ){
          if ( (parseInt(this.twentyFour) > parseInt(this.timerSec) && parseInt(this.timerMin) < 1 ) ){
            this.twentyFour = "--";
          }
          else{
            this.twentyFour = (parseInt(this.twentyFour) - 1) + "";

            if ( parseInt(this.twentyFour) == 0 ){
              this.inGameStart = false;
              this.twentyFour  = "24"; 
            }
          }
        }         

        if ( this.lastMinute == true ){
          if ( parseInt(this.timerMin) == 0 && parseInt(this.timerSec) == 0 ){

            //-- fin de un cuarto
            this.inGameStart = false;
            this.timerMin    = "10";
            this.timerSec    = "00";

            this.period = (parseInt(this.period) + 1) + "";

            this.endQuarter = true;

            this.endQuarterMethod();
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

  askTimeout( team : string ){
    this.pauseGame();
    this.timeoutModalVisible = true;      
    this.timeoutFlag         = true;

    if ( team == "home" ){
      this.timeoutTeam = this.homeTeamName;
    }
    else{
      this.timeoutTeam = this.awayTeamName;
    }

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

  private endQuarterMethod(){
    this.homeFouls = [ { val : 0}, { val : 0}, { val : 0}, { val : 0}, { val : 0} ];
    this.awayFouls = [ { val : 0}, { val : 0}, { val : 0}, { val : 0}, { val : 0} ];

    const canvasImg = this.canvas.nativeElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = canvasImg;
    link.download = this.homeTeamName + '_vs_' + this.awayTeamName + '_' + this.period + '_quarter.png'; // Cambia el nombre del archivo según tu preferencia
    link.click();

    const ctx = this.canvas.nativeElement.getContext('2d')!;
    const imagePath = 'assets/images/image.png'; // Ruta relativa desde el archivo TypeScript

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    };

    img.src = imagePath;

    this.twentyFour = "24";

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
      for ( let i = 0 ; i < this.homePlayersInGame.length ; i ++ ){
        if ( player_id == this.homePlayersInGame[i].id ){
          if ( scores == "scores" ){
            this.homePlayersInGame[i].points += points;
            if ( points == 1 ){
              this.homePlayersInGame[i].free_sht += 1;
            }
            if ( points == 2 ){
              this.homePlayersInGame[i].doubles += 2;
            }
            else if ( points == 3 ){
              this.homePlayersInGame[i].three  += 3;
            }
          }
          if ( points == 1 ){
            this.homePlayersInGame[i].fr_sh_at += 1;
            this.homePlayersInGame[i].gen_at   += 1;
            this.homePlayersInGame[i].fr_sht_percent  = this.getPercent(this.homePlayersInGame[i].free_sht, this.homePlayersInGame[i].fr_sh_at) + "%"; 
            this.homePlayersInGame[i].general_percent = this.getPercent(this.homePlayersInGame[i].points, this.homePlayersInGame[i].gen_at) + "%";
          }
          if ( points == 2 ){
            this.homePlayersInGame[i].doubles_at += 2; 
            this.homePlayersInGame[i].gen_at     += 2; 
            this.homePlayersInGame[i].double_percent  = this.getPercent(this.homePlayersInGame[i].doubles, this.homePlayersInGame[i].doubles_at) + "%";
            this.homePlayersInGame[i].general_percent = this.getPercent(this.homePlayersInGame[i].points, this.homePlayersInGame[i].gen_at) + "%";
          }
          else if ( points == 3 ){
            this.homePlayersInGame[i].three_at += 3; 
            this.homePlayersInGame[i].gen_at   += 3; 
            this.homePlayersInGame[i].three_percent   = this.getPercent(this.homePlayersInGame[i].three, this.homePlayersInGame[i].three_at) + "%";
            this.homePlayersInGame[i].general_percent = this.getPercent(this.homePlayersInGame[i].points, this.homePlayersInGame[i].gen_at) + "%";
          }

        }
      }
    }
    else{
      for ( let i = 0 ; i < this.awayPlayersInGame.length ; i ++ ){
        if ( player_id == this.awayPlayersInGame[i].id ){
          if ( scores == "scores" ){
            this.awayPlayersInGame[i].points += points;
            if ( points == 1 ){
              this.awayPlayersInGame[i].free_sht += 1;
            }
            if ( points == 2 ){
              this.awayPlayersInGame[i].doubles += 2;
            }
            else if ( points == 3 ){
              this.awayPlayersInGame[i].three  += 3;
            }
          }
          if ( points == 1 ){
            this.awayPlayersInGame[i].fr_sh_at += 1;
            this.awayPlayersInGame[i].gen_at   += 1;
            this.awayPlayersInGame[i].fr_sht_percent  = this.getPercent(this.awayPlayersInGame[i].free_sht, this.awayPlayersInGame[i].fr_sh_at) + "%"; 
            this.awayPlayersInGame[i].general_percent = this.getPercent(this.awayPlayersInGame[i].points, this.awayPlayersInGame[i].gen_at) + "%";
          }
          if ( points == 2 ){
            this.awayPlayersInGame[i].doubles_at += 2; 
            this.awayPlayersInGame[i].gen_at     += 2; 
            this.awayPlayersInGame[i].double_percent  = this.getPercent(this.awayPlayersInGame[i].doubles, this.awayPlayersInGame[i].doubles_at) + "%";
            this.awayPlayersInGame[i].general_percent = this.getPercent(this.awayPlayersInGame[i].points, this.awayPlayersInGame[i].gen_at) + "%";
          }
          else if ( points == 3 ){
            this.awayPlayersInGame[i].three_at += 3; 
            this.awayPlayersInGame[i].gen_at   += 3; 
            this.awayPlayersInGame[i].three_percent   = this.getPercent(this.awayPlayersInGame[i].three, this.awayPlayersInGame[i].three_at) + "%";
            this.awayPlayersInGame[i].general_percent = this.getPercent(this.awayPlayersInGame[i].points, this.awayPlayersInGame[i].gen_at) + "%";
          }

        }
      }
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
    this.playerStats    = [];
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
        item : 'Fouls',
        value : player.fouls_in_game
      }
      
      
    );

    this.playerStats.push(
      {
        item  : 'Free shoots',
        value : player.free_sht 
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
        item  : 'Free shoot percent',
        value : player.fr_sht_percent 
      },
      {
        item  : '2 point percent',
        value : player.double_percent 
      },
      {
        item  : '3 point percent',
        value : player.three_percent 
      },      
      {
        item  : 'Minutes played',
        value : player.minutes_played 
      },
    )


  }

  public resetTF( num : string ){
    this.twentyFour = num;
  }

  public normalFoul( player : any ){
    let flag : boolean = false;

    for ( let i = 0 ; i < this.homePlayersInGame.length ; i ++ ){
      if ( this.homePlayersInGame[i].id == player.id ){
        for ( let j = 0 ; j < 5 ; j ++ ){
          if ( j == 4 && this.homePlayersInGame[i].fouls[j].val == 0 ){
              this.homePlayersInGame[i].fouls[j].val = 2;
              this.teamFoul('home');
              j = 5;
            }
          if ( this.homePlayersInGame[i].fouls[j].val == 0 ){
            this.homePlayersInGame[i].fouls[j].val = 1;
            this.teamFoul('home');
            j = 5;
          }
        }
        flag = true;
        break;
      }
    }

    if ( flag == false ){
      for ( let i = 0 ; i < this.awayPlayersInGame.length ; i ++ ){
        if ( this.awayPlayersInGame[i].id == player.id ){
          for ( let j = 0 ; j < 5 ; j ++ ){
            if ( j == 4 && this.awayPlayersInGame[i].fouls[j].val == 0 ){
              this.awayPlayersInGame[i].fouls[j].val = 2;
              this.teamFoul('away');
              j = 5;
            }
            if ( this.awayPlayersInGame[i].fouls[j].val == 0 ){
              this.awayPlayersInGame[i].fouls[j].val = 1;
              this.teamFoul('away');
              j = 5;
            }
          }
          flag = true;
          break;
        }
      }
    }
  }

  public teamFoul( team : string ){
    let flag : boolean = false;
    if ( team == 'home' ){
      for ( let i = 0 ; i < this.homeFouls.length ; i ++ ){
        if ( this.homeFouls[i].val == 0 ){
          this.homeFouls[i].val = 1;
          if ( i != this.homeFouls.length -1 ){
            flag = true;
          }
          break;
        }
      }
      if ( flag == false ){
        for ( let i = 0 ; i < this.homeFouls.length ; i ++ ){
          this.homeFouls[i].val = 2;
        }
      }
    }
    else {
      for ( let i = 0 ; i < this.awayFouls.length ; i ++ ){
        if ( this.awayFouls[i].val == 0 ){
          this.awayFouls[i].val = 1;
          if ( i != this.awayFouls.length -1 ){
            flag = true;
          }          
          break;
        }
      }
      if ( flag == false ){
        for ( let i = 0 ; i < this.awayFouls.length ; i ++ ){
          this.awayFouls[i].val = 2;
        }
      }
    }

  }

  public changePoss( team : string ){
    if ( team == 'home' ){
      this.possHome = true;
      this.possAway = false;
    }
    else{
      this.possHome = false;
      this.possAway = true;
    }
  }

  public resetTimeoutTimer(){
    this.timeoutTimer = "60";
  }

  public openSubsModal( team : string ){
    if ( team == "home" ){
      this.subsVisibleHome = true;
    }
    else{
      this.subsVisibleAway = true;
    }
  }


  //-- FILES

  public onFileChangeHome( event: any ) {
    this.fileHome = event.target.files[0];

  }

  public onFileChangeAway( event: any ) {
    this.fileAway = event.target.files[0];
  }

  public readFileHome() {
    if (this.fileHome) {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // Assuming you want to read the first sheet

        const worksheet = workbook.Sheets[sheetName];
        this.dataHome   = XLSX.utils.sheet_to_json(worksheet);
        this.chargeHomePlayersFromExcel();
      };
      fileReader.readAsArrayBuffer(this.fileHome);
    }
  }

  public readFileAway() {
    if (this.fileAway) {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // Assuming you want to read the first sheet

        const worksheet = workbook.Sheets[sheetName];
        this.dataAway   = XLSX.utils.sheet_to_json(worksheet);
        this.chargeAwayPlayersFromExcel();
      };
      fileReader.readAsArrayBuffer(this.fileAway);
    }
  }

  public chargeHomePlayersFromExcel(){
    this.homePlayers = [];
    for ( let i = 0 ; i < this.dataHome.length ; i ++ ){
      let json : any = {
        id       : this.idAux,
        name     : this.dataHome[i].fullname,
        age      : this.dataHome[i].age,
        position : 'Pivot',
        jersey_n : this.dataHome[i].n,
        in_game  : false,
        rebounds : 0,
        points   : 0,
        assists  : 0,
        free_sht : 0,
        fr_sh_at : 0,
        doubles  : 0,
        three    : 0,
        gen_at   : 0,
        doubles_at  : 0,
        three_at    : 0,
        general_percent : "0%",
        fr_sht_percent  : "0%",
        three_percent   : "0%",
        double_percent  : "0%",
        minutes_played  : 0,
        fouls_in_game   : 0,
        fouls           : [ { i : 1, val : 0}, { i : 2, val : 0 }, { i : 3 , val : 0 }, { i : 4 , val : 0}, { i : 5, val : 0 } ]
      };

      this.idAux += 1;

      this.homePlayers.push(json)
    }
    this.homePlayersCharged = true;
  }

  public chargeAwayPlayersFromExcel(){
    this.awayPlayers = [];
    for ( let i = 0 ; i < this.dataAway.length ; i ++ ){
      let json : any = {
        id       : this.idAux,
        name     : this.dataAway[i].fullname,
        age      : this.dataAway[i].age,
        position : 'Pivot',
        jersey_n : this.dataAway[i].n,
        in_game  : false,
        rebounds : 0,
        points   : 0,
        assists  : 0,
        free_sht : 0,
        fr_sh_at : 0,
        doubles  : 0,
        three    : 0,
        gen_at   : 0,
        doubles_at  : 0,
        three_at    : 0,
        general_percent : "0%",
        fr_sht_percent  : "0%",
        three_percent   : "0%",
        double_percent  : "0%",
        minutes_played  : 0,
        fouls_in_game   : 0,
        fouls           : [ { i : 1, val : 0}, { i : 2, val : 0 }, { i : 3 , val : 0 }, { i : 4 , val : 0}, { i : 5, val : 0 } ]
      };

      this.idAux += 1;

      this.awayPlayers.push(json)
    }
    this.awayPlayersCharged = true;
  }
}







