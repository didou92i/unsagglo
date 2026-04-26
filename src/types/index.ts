export type StatutAdherent = 'pending_validation' | 'actif' | 'resilie';

export type CategorieAgent = 'A' | 'B' | 'C';

export type StatutPro =
  | 'titulaire'
  | 'stagiaire'
  | 'contractuel_cdi'
  | 'contractuel_cdd'
  | 'apprenti'
  | 'retraite';

export type ModePaiement =
  | 'cheque'
  | 'virement'
  | 'sepa'
  | 'stripe_mensuel'
  | 'stripe_annuel';

export type PeriodicitePaiement = 'mensuel' | 'annuel';

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
  // Identité civile
  nom: string;
  prenom: string;
  date_naissance?: string;
  // Coordonnées
  email: string;
  telephone?: string;
  adresse_ligne1?: string;
  adresse_ligne2?: string;
  adresse_cp?: string;
  adresse_ville?: string;
  // Situation professionnelle
  service?: string;
  grade?: string;
  categorie?: CategorieAgent;
  echelon?: number;
  statut_pro?: StatutPro;
  site_affectation?: string;
  date_entree_carpf?: string;
  // Modalités d'adhésion
  mode_paiement?: ModePaiement;
  periodicite_paiement?: PeriodicitePaiement;
  // Traçabilité
  rgpd_consent_at?: string;
  statuts_acceptes_at?: string;
  // Workflow
  statut: StatutAdherent;
  created_at: string;
  updated_at?: string;
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
