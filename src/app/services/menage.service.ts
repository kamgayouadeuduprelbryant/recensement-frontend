import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Menage,
  MenageRequest,
  Statistiques
} from '../models/menage.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenageService {

  private apiUrl = `${environment.apiUrl}/menages`;

  constructor(private http: HttpClient) {}

  listerMenages(): Observable<Menage[]> {
    return this.http.get<Menage[]>(this.apiUrl);
  }

  creerMenage(menage: MenageRequest): Observable<Menage> {
    return this.http.post<Menage>(this.apiUrl, menage);
  }

  supprimerMenage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obtenirStatistiques(): Observable<Statistiques> {
    return this.http.get<Statistiques>(
      `${this.apiUrl}/statistiques`
    );
  }
}