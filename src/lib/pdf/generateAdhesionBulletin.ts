import { jsPDF } from "jspdf";
import {
  ORG_INFO,
  COTISATION_MENSUELLE,
  ribDisplayLines,
} from "@/lib/orgInfo";
import { SERVICES } from "@/constants/services";
import type { AdhesionFormValues } from "@/pages/membership/adhesionSchema";

const resolveServiceLabel = (
  service: string,
  serviceLibre: string | undefined,
): string => {
  if (service === "autre_service" && serviceLibre) return serviceLibre;
  const match = SERVICES.find((s) => s.value === service);
  return match?.label ?? service;
};

// =============================================
// Constantes de mise en page (millimètres)
// =============================================
const PAGE = { width: 210, height: 297 };
const MARGIN = { top: 15, right: 18, bottom: 15, left: 18 };
const CONTENT_WIDTH = PAGE.width - MARGIN.left - MARGIN.right;

// Couleurs de la charte UNSAgglo (RGB)
const COLORS = {
  marine: [41, 35, 92] as [number, number, number],
  bleu: [0, 159, 227] as [number, number, number],
  rouge: [231, 65, 36] as [number, number, number],
  noir: [33, 37, 41] as [number, number, number],
  gris: [108, 117, 125] as [number, number, number],
  fondClair: [239, 249, 254] as [number, number, number],
};

const STATUT_LABEL: Record<AdhesionFormValues["statut_pro"], string> = {
  titulaire: "Titulaire",
  stagiaire: "Stagiaire",
  contractuel_cdi: "Contractuel CDI",
  contractuel_cdd: "Contractuel CDD",
  apprenti: "Apprenti",
  retraite: "Retraité de la CARPF",
};

const MODE_LABEL: Record<AdhesionFormValues["mode_paiement"], string> = {
  cheque: "Chèque à l'ordre d'UNSAgglo",
  virement: "Virement bancaire (RIB transmis après validation)",
};

// =============================================
// Helpers PDF
// =============================================
const setText = (
  doc: jsPDF,
  size: number,
  color: [number, number, number] = COLORS.noir,
  bold = false,
): void => {
  doc.setFontSize(size);
  doc.setTextColor(color[0], color[1], color[2]);
  doc.setFont("helvetica", bold ? "bold" : "normal");
};

const drawColorBar = (
  doc: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  color: [number, number, number],
): void => {
  doc.setFillColor(color[0], color[1], color[2]);
  doc.rect(x, y, w, h, "F");
};

const formatDateFR = (iso: string | undefined): string => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatCotisation = (n: number): string =>
  n.toFixed(2).replace(".", ",") + " €";

// =============================================
// Helpers de mise en page sectionnelle
// =============================================
const sectionTitle = (
  doc: jsPDF,
  y: number,
  num: string,
  title: string,
): number => {
  setText(doc, 11, COLORS.bleu, true);
  doc.text(num, MARGIN.left, y);
  setText(doc, 11, COLORS.marine, true);
  doc.text(title, MARGIN.left + 7, y);
  doc.setDrawColor(COLORS.bleu[0], COLORS.bleu[1], COLORS.bleu[2]);
  doc.setLineWidth(0.2);
  doc.line(MARGIN.left, y + 1.5, PAGE.width - MARGIN.right, y + 1.5);
  return y + 7;
};

const renderTwoColumnLines = (
  doc: jsPDF,
  y: number,
  lines: string[][],
): number => {
  const labelX = MARGIN.left;
  const valueX = MARGIN.left + 50;
  lines.forEach(([label, value]) => {
    if (label) {
      setText(doc, 9, COLORS.gris);
      doc.text(label, labelX, y);
    }
    setText(doc, 10, COLORS.noir);
    doc.text(value || "—", valueX, y);
    y += 5.2;
  });
  return y;
};

const drawHeaderBars = (doc: jsPDF): void => {
  drawColorBar(doc, 0, 0, PAGE.width, 8, COLORS.marine);
  drawColorBar(doc, 0, 8, PAGE.width / 3, 1.2, COLORS.bleu);
  drawColorBar(doc, PAGE.width / 3, 8, PAGE.width / 3, 1.2, COLORS.marine);
  drawColorBar(
    doc,
    (2 * PAGE.width) / 3,
    8,
    PAGE.width / 3,
    1.2,
    COLORS.rouge,
  );
};

const drawFooter = (doc: jsPDF, page: number, total: number): void => {
  setText(doc, 7, COLORS.gris);
  const footerY = PAGE.height - 8;
  doc.text(
    `${ORG_INFO.nom} — ${ORG_INFO.adresse.ligne1}, ${ORG_INFO.adresse.cp} ${ORG_INFO.adresse.ville}`,
    MARGIN.left,
    footerY,
  );
  doc.text(`Page ${page}/${total}`, PAGE.width - MARGIN.right, footerY, {
    align: "right",
  });
  doc.text(ORG_INFO.affiliation, MARGIN.left, footerY + 3);
};

// =============================================
// Génération du bulletin
// =============================================
export const generateAdhesionBulletin = (values: AdhesionFormValues): Blob => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
  });

  // ============= Page 1 =============
  let y = MARGIN.top;
  drawHeaderBars(doc);
  y = 18;

  // Titre principal
  setText(doc, 22, COLORS.marine, true);
  doc.text("Bulletin d'adhésion 2026", MARGIN.left, y);
  y += 7;
  setText(doc, 11, COLORS.bleu, true);
  doc.text(ORG_INFO.nom, MARGIN.left, y);
  y += 5;
  setText(doc, 9, COLORS.gris);
  doc.text(`« ${ORG_INFO.devise} »`, MARGIN.left, y);

  // Bloc droit : adresse syndicat
  setText(doc, 8, COLORS.gris);
  const adresseLines = [
    ORG_INFO.adresse.ligne1,
    `${ORG_INFO.adresse.cp} ${ORG_INFO.adresse.ville}`,
    ORG_INFO.email,
  ];
  let yRight = 19;
  adresseLines.forEach((line) => {
    doc.text(line, PAGE.width - MARGIN.right, yRight, { align: "right" });
    yRight += 4;
  });

  y += 9;
  doc.setDrawColor(COLORS.bleu[0], COLORS.bleu[1], COLORS.bleu[2]);
  doc.setLineWidth(0.4);
  doc.line(MARGIN.left, y, PAGE.width - MARGIN.right, y);
  y += 6;

  // Section 1 — Identité civile
  y = sectionTitle(doc, y, "1.", "Identité de l'adhérent");
  const idLines: string[][] = [
    ["Nom :", values.nom.toUpperCase()],
    ["Prénom :", values.prenom],
    ["Date de naissance :", formatDateFR(values.date_naissance)],
  ];
  y = renderTwoColumnLines(doc, y, idLines);

  y += 3;

  // Section 2 — Coordonnées
  y = sectionTitle(doc, y, "2.", "Coordonnées");
  const coordLines: string[][] = [
    ["Adresse :", values.adresse_ligne1],
    ...(values.adresse_ligne2 ? [["", values.adresse_ligne2]] : []),
    ["", `${values.adresse_cp} ${values.adresse_ville}`],
    ["E-mail :", values.email],
    ["Téléphone :", values.telephone],
  ];
  y = renderTwoColumnLines(doc, y, coordLines);

  y += 3;

  // Section 3 — Situation professionnelle
  y = sectionTitle(doc, y, "3.", "Situation professionnelle à la CARPF");
  const proLines: string[][] = [
    ["Statut :", STATUT_LABEL[values.statut_pro]],
    ["Catégorie :", `Catégorie ${values.categorie}`],
    ["Grade :", values.grade],
    ["Échelon :", String(values.echelon)],
    ["Service / direction :", resolveServiceLabel(values.service, values.service_libre)],
    ["Site d'affectation :", values.site_affectation],
    ...(values.date_entree_carpf
      ? [["Date d'entrée à la CARPF :", formatDateFR(values.date_entree_carpf)]]
      : []),
  ];
  y = renderTwoColumnLines(doc, y, proLines);

  y += 4;

  // Section 4 — Cotisation
  y = sectionTitle(doc, y, "4.", "Cotisation et modalités de paiement");

  drawColorBar(doc, MARGIN.left, y, CONTENT_WIDTH, 24, COLORS.fondClair);
  setText(doc, 16, COLORS.marine, true);
  doc.text(
    `${formatCotisation(COTISATION_MENSUELLE)} / mois`,
    MARGIN.left + 4,
    y + 9,
  );
  setText(doc, 9, COLORS.gris);
  doc.text(
    `Soit ${formatCotisation(COTISATION_MENSUELLE * 12)} par an. Cotisation unique pour toutes catégories,`,
    MARGIN.left + 4,
    y + 15,
  );
  doc.text(
    `votée en Assemblée Générale Constitutive du 9 janvier 2026 (Article 17 des statuts).`,
    MARGIN.left + 4,
    y + 19,
  );
  y += 28;

  // Mode de paiement
  setText(doc, 10, COLORS.noir, true);
  doc.text("Mode de paiement choisi :", MARGIN.left, y);
  setText(doc, 10);
  doc.text(MODE_LABEL[values.mode_paiement], MARGIN.left + 60, y);
  y += 6;

  if (values.mode_paiement === "virement") {
    setText(doc, 9, COLORS.gris, true);
    doc.text("Coordonnées bancaires UNSAgglo :", MARGIN.left, y);
    y += 4;
    setText(doc, 9, COLORS.gris);
    ribDisplayLines().forEach((line) => {
      doc.text(line, MARGIN.left, y);
      y += 4;
    });
  }

  drawFooter(doc, 1, 2);

  // ============= Page 2 =============
  doc.addPage();
  drawHeaderBars(doc);
  y = MARGIN.top + 8;

  // Section 5 — Engagement
  y = sectionTitle(doc, y, "5.", "Engagement");

  setText(doc, 9, COLORS.noir);
  const engagement = [
    "En complétant et retournant ce bulletin signé, j'adhère librement et",
    `volontairement au syndicat ${ORG_INFO.nom}, et je déclare :`,
  ];
  engagement.forEach((line) => {
    doc.text(line, MARGIN.left, y);
    y += 4.5;
  });
  y += 1;

  const bullets = [
    "accepter sans réserve les statuts d'UNSAgglo, adoptés en Assemblée",
    "  Générale Constitutive du 9 janvier 2026 (Article 5 des statuts) ;",
    "adhérer aux valeurs de l'UNSA telles que définies dans le préambule",
    "  des statuts (laïcité, démocratie, justice sociale, défense du Service",
    "  public, fraternité et tolérance, indépendance syndicale) ;",
    "m'engager à régler ma cotisation pour l'année de référence,",
    "  conformément à l'Article 6 des statuts.",
  ];
  bullets.forEach((line) => {
    if (line.startsWith("  ")) {
      setText(doc, 9, COLORS.noir);
      doc.text(line, MARGIN.left + 4, y);
    } else {
      setText(doc, 9, COLORS.bleu, true);
      doc.text("•", MARGIN.left, y);
      setText(doc, 9, COLORS.noir);
      doc.text(line, MARGIN.left + 4, y);
    }
    y += 4.2;
  });

  y += 5;

  // Encadré crédit d'impôt
  drawColorBar(doc, MARGIN.left, y, CONTENT_WIDTH, 22, COLORS.fondClair);
  setText(doc, 10, COLORS.marine, true);
  doc.text("Crédit d'impôt syndical", MARGIN.left + 4, y + 6);
  setText(doc, 8, COLORS.noir);
  const creditLines = [
    "Conformément à l'article 199 quater C du Code général des impôts, 66 % du montant",
    "des cotisations versées (dans la limite de 1 % du revenu brut imposable) ouvrent droit à",
    "un crédit d'impôt sur le revenu. Une attestation fiscale annuelle vous sera transmise par",
    "UNSAgglo. Ce dispositif ne s'applique pas aux contribuables ayant opté pour les frais réels.",
  ];
  let yCredit = y + 11;
  creditLines.forEach((line) => {
    doc.text(line, MARGIN.left + 4, yCredit);
    yCredit += 3.5;
  });
  y += 26;

  // Mention RGPD
  setText(doc, 8, COLORS.gris);
  const rgpdText = [
    "Les données figurant sur ce bulletin sont collectées par UNSAgglo aux fins de gestion de votre adhésion (base",
    "légale : article 6.1.b et 9.2.d RGPD). Elles sont accessibles aux seuls membres habilités du bureau et conservées",
    "pendant la durée de l'adhésion, prolongée de 3 ans après radiation. Vous disposez des droits d'accès, de",
    "rectification, d'effacement, de limitation, d'opposition et de portabilité (art. 15 à 22 RGPD), exercés par",
    `e-mail à ${ORG_INFO.email} (objet : « RGPD »). Politique complète : https://unsagglo.fr/politique-confidentialite`,
  ];
  rgpdText.forEach((line) => {
    doc.text(line, MARGIN.left, y);
    y += 3.4;
  });

  y += 6;

  // Date / Lieu / Signature
  setText(doc, 10, COLORS.marine, true);
  doc.text("Fait à : ____________________________", MARGIN.left, y);
  doc.text("Le : _________________", MARGIN.left + 95, y);
  y += 18;

  setText(doc, 10, COLORS.marine, true);
  doc.text("Signature de l'adhérent", MARGIN.left, y);
  setText(doc, 8, COLORS.gris);
  doc.text(
    "(précédée de la mention « Lu et approuvé »)",
    MARGIN.left,
    y + 4,
  );

  doc.setDrawColor(COLORS.gris[0], COLORS.gris[1], COLORS.gris[2]);
  doc.setLineWidth(0.3);
  doc.rect(MARGIN.left, y + 7, 80, 30);

  drawFooter(doc, 2, 2);

  return doc.output("blob");
};
