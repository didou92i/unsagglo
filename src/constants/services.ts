import type { SelectOption, SelectOptionGroup } from "@/types/select";

export type ServiceOption = SelectOption;
export type ServiceGroup = SelectOptionGroup;

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    group: "Direction Générale et Pilotage",
    options: [
      { value: "dgs", label: "Direction Générale des Services (DGS)" },
      { value: "dgst", label: "Direction Générale des Services Techniques (DGST)" },
      { value: "dga_ressources", label: "DGA Ressources" },
      { value: "dga_population", label: "DGA Services à la Population" },
      { value: "dga_mutualisation", label: "DGA Mutualisation" },
      { value: "audit_controle_info", label: "Direction Audit, Contrôle de Gestion et Informatique" },
    ],
  },
  {
    group: "Services à la Population",
    options: [
      { value: "sports", label: "Direction des Sports" },
      { value: "affaires_sociales", label: "Direction des Affaires Sociales" },
      { value: "emploi_politique_ville", label: "Direction de l'Emploi et Politique de la Ville" },
      { value: "culture_patrimoine", label: "Direction Culture et Patrimoine" },
    ],
  },
  {
    group: "Sécurité",
    options: [
      { value: "police_intercommunale", label: "Direction Sécurité — Police Intercommunale" },
      { value: "videoprotection", label: "Direction Vidéoprotection" },
    ],
  },
  {
    group: "Ressources et Support",
    options: [
      { value: "drh", label: "Direction des Ressources Humaines (DRH)" },
      { value: "finances", label: "Direction des Finances" },
      { value: "commande_publique", label: "Direction de la Commande Publique" },
      { value: "juridique_foncier", label: "Direction des Affaires Juridiques et du Foncier" },
      { value: "dsi_telecoms", label: "Direction des Systèmes d'Information et Télécoms" },
      { value: "communication", label: "Direction Communication" },
    ],
  },
  {
    group: "Aménagement et Technique",
    options: [
      { value: "amenagement", label: "Direction de l'Aménagement" },
      { value: "batiments_architecture", label: "Direction Bâtiments et Architecture" },
      { value: "economie_territoires", label: "Direction Économie, Territoires, Innovation et Numérique" },
      { value: "developpement_durable", label: "Direction Développement Durable" },
      { value: "eau_assainissement", label: "Eau et Assainissement" },
      { value: "espaces_verts_voirie", label: "Espaces Verts — Voirie" },
    ],
  },
  {
    group: "Autre",
    options: [
      { value: "autre_service", label: "Autre service (à préciser)" },
    ],
  },
];

export const SERVICES: ServiceOption[] = SERVICE_GROUPS.flatMap((g) => g.options);
