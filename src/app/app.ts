import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService, Utilisateur } from './service.ts/service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{utilisateur?: Utilisateur;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.obtenirUtilisateurConnecte().subscribe({
      next: (data) => (this.utilisateur = data),
      error: () => (this.utilisateur = { connecte: false })
    });
  }

  seConnecter(): void {
    this.authService.seConnecter();
  }

  seDeconnecter(): void {
    this.authService.seDeconnecter();
  }
}
