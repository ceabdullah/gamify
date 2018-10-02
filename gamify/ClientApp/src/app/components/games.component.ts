import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameService } from '../services/games.service';
import { Router } from '@angular/router';

@Component({
  selector: 'games',
  templateUrl: './games.component.html'
})
export class GamesComponent {

  public games: Game[];
  errorMessage: any;

  constructor(private http: HttpClient, private _router: Router, private _gameService: GameService, @Inject('BASE_URL') private baseUrl: string) {
    http.get<Game[]>(baseUrl + 'api/Games').subscribe(result => {
      this.games = result;
    }, error => console.error(error));
  }

  public delete(id) {
    this._gameService.deleteGames(id)
      .subscribe((data) => {
        this.http.get<Game[]>(this.baseUrl + 'api/Games').subscribe(result => {
          this.games = result;
        }, error => console.error(error));
      }, error => this.errorMessage = error)
  }

}

interface Game {
  id: number;
  gameName: string;
  gameUrl: string;
  gameImage: string;
}
