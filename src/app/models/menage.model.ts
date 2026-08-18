export interface MenageRequest {

  chefMenage: string;

  zone: string;

  nombrePersonnes: number;

  ageMoyen: number;

  typeLogement: string;
}


export interface Menage {

  id: number;

  chefMenage: string;

  zone: string;

  nombrePersonnes: number;

  ageMoyen: number;

  typeLogement: string;

  dateCreation: string;

  dateDerniereModification: string;
}


export interface Statistiques {

  populationTotale: number;

  nombreMenages: number;

  tailleMoyenneMenage: number;

  zonePlusPeuplee: string;

  zoneAgeMoyenLePlusBas: string;

  zoneAgeMoyenLePlusEleve: string;

  zoneTauxSurpeuplementLePlusEleve: string;

  typeLogementDominantParZone: string;
}