import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export interface Utilisateur {
  connecte: boolean;
  nom?: string;
  email?: string;
  photo?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl.replace('/api', '');

  constructor(private http: HttpClient) {}

  obtenirUtilisateurConnecte(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}/api/auth/user`, { withCredentials: true });
  }

  seConnecter(): void {
    window.location.href = `${this.baseUrl}/oauth2/authorization/google`;
  }

  seDeconnecter(): void {
    window.location.href = `${this.baseUrl}/logout`;
  }
}