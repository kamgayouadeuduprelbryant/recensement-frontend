import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Menage, Statistiques } from '../models/menage.model';
import { ToastService } from '../services/toast';
import { MenageService } from '../services/menage.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil implements OnInit {
  menageForm: FormGroup;
  menages: Menage[] = [];
  statistiques?: Statistiques;

  constructor(
    private fb: FormBuilder,
    private menageService: MenageService,
    private toastService: ToastService
  ) {
    this.menageForm = this.fb.group({
      chefMenage: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      zone: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      nombrePersonnes: ['', [Validators.required, Validators.min(1), Validators.max(30)]],
      ageMoyen: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      typeLogement: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.chargerMenages();
    this.chargerStatistiques();
  }

  chargerMenages(): void {
    this.menageService.listerMenages().subscribe({
      next: (data) => (this.menages = data),
      error: () => this.toastService.afficherErreur('Impossible de charger la liste des ménages')
    });
  }

  chargerStatistiques(): void {
    this.menageService.obtenirStatistiques().subscribe({
      next: (data) => (this.statistiques = data),
      error: () => this.toastService.afficherErreur('Impossible de charger les statistiques')
    });
  }

  onSubmit(): void {
    if (this.menageForm.invalid) return;

    this.menageService.creerMenage(this.menageForm.value).subscribe({
      next: () => {
        this.toastService.afficherSucces('Ménage enregistré avec succès');
        this.menageForm.reset();
        this.chargerMenages();
        this.chargerStatistiques();
      },
      error: () => this.toastService.afficherErreur("Erreur lors de l'enregistrement du ménage")
    });
  }

  supprimer(id: number): void {
    this.menageService.supprimerMenage(id).subscribe({
      next: () => {
        this.toastService.afficherSucces('Ménage supprimé avec succès');
        this.chargerMenages();
        this.chargerStatistiques();
      },
      error: () => this.toastService.afficherErreur('Erreur lors de la suppression')
    });
  }
}