import type { SelectOption, SelectOptionGroup } from "@/types/select";

export type ServiceOption = SelectOption;
export type ServiceGroup = SelectOptionGroup;

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    group: "Direction Generale et Pilotage",
    options: [
      { value: "dgs", label: "Direction Generale des Services (DGS)" },
      { value: "dgst", label: "Direction Generale des Services Techniques (DGST)" },
      { value: "dga_ressources", label: "DGA Ressources" },
      { value: "dga_population", label: "DGA Services a la Population" },
      { value: "dga_mutualisation", label: "DGA Mutualisation" },
      { value: "audit_controle_info", label: "Direction Audit, Controle de Gestion et Informatique" },
    ],
  },
  {
    group: "Services a la Population",
    options: [
      { value: "sports", label: "Direction des Sports" },
      { value: "affaires_sociales", label: "Direction des Affaires Sociales" },
      { value: "emploi_politique_ville", label: "Direction de l'Emploi et Politique de la Ville" },
      { value: "culture_patrimoine", label: "Direction Culture et Patrimoine" },
    ],
  },
  {
    group: "Securite",
    options: [
      { value: "police_intercommunale", label: "Direction Securite — Police Intercommunale" },
      { value: "videoprotection", label: "Direction Videoprotection" },
    ],
  },
  {
    group: "Ressources et Support",
    options: [
      { value: "drh", label: "Direction des Ressources Humaines (DRH)" },
      { value: "finances", label: "Direction des Finances" },
      { value: "commande_publique", label: "Direction de la Commande Publique" },
      { value: "juridique_foncier", label: "Direction des Affaires Juridiques et du Foncier" },
      { value: "dsi_telecoms", label: "Direction des Systemes d'Information et Telecoms" },
      { value: "communication", label: "Direction Communication" },
    ],
  },
  {
    group: "Amenagement et Technique",
    options: [
      { value: "amenagement", label: "Direction de l'Amenagement" },
      { value: "batiments_architecture", label: "Direction Batiments et Architecture" },
      { value: "economie_territoires", label: "Direction Economie, Territoires, Innovation et Numerique" },
      { value: "developpement_durable", label: "Direction Developpement Durable" },
      { value: "eau_assainissement", label: "Eau et Assainissement" },
      { value: "espaces_verts_voirie", label: "Espaces Verts — Voirie" },
    ],
  },
  {
    group: "Autre",
    options: [
      { value: "autre_service", label: "Autre service (preciser)" },
    ],
  },
];

export const SERVICES: ServiceOption[] = SERVICE_GROUPS.flatMap((g) => g.options);
