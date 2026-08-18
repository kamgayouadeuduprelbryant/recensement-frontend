import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import {
  Menage,
  Statistiques
} from '../models/menage.model';

import { MenageService } from '../services/menage.service';


@Component({
  selector: 'app-accueil',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil implements OnInit {

  menageForm: FormGroup;

  menages: Menage[] = [];

  statistiques: Statistiques | null = null;

  chargement = false;

  message = '';

  erreur = '';


  constructor(
    private fb: FormBuilder,
    private menageService: MenageService
  ) {

    this.menageForm = this.fb.group({

      chefMenage: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      zone: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      nombrePersonnes: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(30)
        ]
      ],

      ageMoyen: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(120)
        ]
      ],

      typeLogement: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ]

    });

  }


  ngOnInit(): void {

    this.chargerTout();

  }


  chargerTout(): void {

    this.chargerMenages();

    this.chargerStatistiques();

  }


  chargerMenages(): void {

    this.menageService
      .listerMenages()
      .subscribe({

        next: (data) => {

          console.log('Ménages reçus :', data);

          this.menages = data;

        },

        error: (error) => {

          console.error(
            'Erreur chargement ménages :',
            error
          );

        }

      });

  }


  chargerStatistiques(): void {

    this.menageService
      .obtenirStatistiques()
      .subscribe({

        next: (data) => {

          console.log(
            'Statistiques reçues :',
            data
          );

          this.statistiques = data;

        },

        error: (error) => {

          console.error(
            'Erreur statistiques :',
            error
          );

        }

      });

  }


  onSubmit(): void {

    if (this.menageForm.invalid) {

      this.menageForm.markAllAsTouched();

      return;

    }


    this.chargement = true;

    this.message = '';

    this.erreur = '';


    this.menageService
      .creerMenage(this.menageForm.value)
      .subscribe({

        next: (nouveauMenage) => {

          console.log(
            'Nouveau ménage :',
            nouveauMenage
          );


          /*
           * AJOUT DIRECT À L'ÉCRAN
           */
          this.menages.unshift(nouveauMenage);


          /*
           * VIDER LE FORMULAIRE
           */
          this.menageForm.reset();


          /*
           * MESSAGE
           */
          this.message =
            'Ménage enregistré avec succès';


          /*
           * RECHARGER LES STATISTIQUES
           */
          this.chargerStatistiques();


          this.chargement = false;

        },

        error: (error) => {

          console.error(
            'Erreur création :',
            error
          );

          this.erreur =
            "Impossible d'enregistrer le ménage";

          this.chargement = false;

        }

      });

  }


  supprimer(id: number): void {

    if (!confirm('Voulez-vous supprimer ce ménage ?')) {

      return;

    }


    this.menageService
      .supprimerMenage(id)
      .subscribe({

        next: () => {

          /*
           * RETIRER DIRECTEMENT DE L'ÉCRAN
           */
          this.menages =
            this.menages.filter(
              menage => menage.id !== id
            );


          /*
           * RECHARGER LES STATISTIQUES
           */
          this.chargerStatistiques();


          this.message =
            'Ménage supprimé avec succès';

        },

        error: (error) => {

          console.error(
            'Erreur suppression :',
            error
          );

          this.erreur =
            'Impossible de supprimer le ménage';

        }

      });

  }

}