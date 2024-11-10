import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employe } from '../model/employe';
const API_URL="http://localhost:3000/employes";

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private readonly http:HttpClient=inject(HttpClient);

  public getEmploye():Observable<Employe[]>{
    return this.http.get<Employe[]>(API_URL);
  }

  public addEmploye(e:Employe):Observable<Employe>{
    return this.http.post<Employe>(API_URL,e);
  }
}
