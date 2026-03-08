export interface ContribHook {
  loading: boolean;
  error: string | null;
  submit: (data: {
    prenom: string;
    service: string;
    statut: string;
    theme: string;
    contenu: string;
    anonyme: boolean;
  }) => Promise<void>;
}

export interface CandidatHook {
  loading: boolean;
  error: string | null;
  submit: (data: {
    prenom: string;
    nom: string;
    service: string;
    email: string;
    telephone: string;
    adresse: string;
  }) => Promise<void>;
}
