import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../model/game';
const API_URL="http://localhost:3000/games";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly http:HttpClient=inject(HttpClient);

  public getGame():Observable<Game[]>{
    return this.http.get<Game[]>(API_URL);
  }

  public addGame(g:Game):Observable<Game>{
    return this.http.post<Game>(API_URL,g);
  }
}
