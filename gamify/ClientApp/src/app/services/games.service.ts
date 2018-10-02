import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class GameService {
  myAppUrl: string = "";

  constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  getGames() {
    return this._http.get(this.myAppUrl + 'api/Games')
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getGamesById(id: number) {
    return this._http.get(this.myAppUrl + "api/Games/" + id)
      .map((response: Response) => response.json())
      .catch(this.errorHandler)
  }

  saveGames(game) {
    return this._http.post(this.myAppUrl + 'api/Games', game)
      .map((response: Response) => response.json())
      .catch(this.errorHandler)
  }

  updateGames(id, game) {
    return this._http.put(this.myAppUrl + 'api/Games', { "id": id, "Game": game })
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  deleteGames(id) {
    return this._http.delete(this.myAppUrl + "api/Games/" + id)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}
