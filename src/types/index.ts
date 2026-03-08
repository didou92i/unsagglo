export type StatutAdherent = 'actif' | 'en_attente' | 'resilie';

export type CategorieArticle =
  | 'actualite'
  | 'tract'
  | 'cr_cst'
  | 'fiche_droit';

export type ThemeElection = string;

export type CategoriesDroit =
  | 'carriere'
  | 'conges'
  | 'citis'
  | 'discipline'
  | 'rps'
  | 'temps_partiel';

export interface Adherent {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  service?: string;
  grade?: string;
  telephone?: string;
  statut: StatutAdherent;
  created_at: string;
}

export interface Article {
  id: string;
  slug: string;
  titre: string;
  contenu: string;
  categorie: CategorieArticle;
  auteur: string;
  publie: boolean;
  created_at: string;
}

export interface ContributionElection {
  id: string;
  theme: ThemeElection;
  contenu: string;
  prenom: string;
  service: string;
  created_at: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface Document {
  id: string;
  nom: string;
  type: 'pv' | 'tract' | 'modele_recours';
  url: string;
  date: string;
}
