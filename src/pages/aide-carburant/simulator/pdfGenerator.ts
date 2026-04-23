import type { jsPDF } from "jspdf";

export interface PdfParams {
  compositionFoyer: string | null;
  profilKilometrage: string | null;
}

const MARINE: [number, number, number] = [41, 35, 92];
const BLUE: [number, number, number] = [0, 159, 227];
const RED: [number, number, number] = [231, 65, 36];
const WARNING_BG: [number, number, number] = [255, 248, 225];
const WARNING_TEXT: [number, number, number] = [160, 64, 0];
const CARD_BG: [number, number, number] = [245, 245, 247];
const LIGHT_BLUE_BG: [number, number, number] = [239, 249, 254];
const BORDER: [number, number, number] = [230, 234, 240];
const BLACK: [number, number, number] = [0, 0, 0];
const MUTED: [number, number, number] = [100, 116, 139];

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 20;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const pad2 = (n: number): string => String(n).padStart(2, "0");

const formatDateCompact = (d: Date): string =>
  `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}`;

const formatDateDisplay = (d: Date): string =>
  `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`;

const randomRef = (): string => {
  const n = Math.floor(Math.random() * 10000);
  return String(n).padStart(4, "0");
};

const setFill = (doc: jsPDF, [r, g, b]: [number, number, number]): void => {
  doc.setFillColor(r, g, b);
};

const setDraw = (doc: jsPDF, [r, g, b]: [number, number, number]): void => {
  doc.setDrawColor(r, g, b);
};

const setText = (doc: jsPDF, [r, g, b]: [number, number, number]): void => {
  doc.setTextColor(r, g, b);
};

/** Simulates a checkmark for Helvetica (no ✓ glyph): blue filled square + "Validé". */
const drawValidatedTag = (doc: jsPDF, x: number, y: number, label: string): void => {
  setFill(doc, BLUE);
  doc.rect(x, y - 2.7, 3, 3, "F");
  setText(doc, MARINE);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(label, x + 5, y);
};

const renderHeaderBand = (doc: jsPDF): void => {
  setFill(doc, MARINE);
  doc.rect(0, 0, PAGE_WIDTH, 25, "F");

  setText(doc, [255, 255, 255]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("UNSAgglo", MARGIN, 11);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Roissy Pays de France", MARGIN, 17);

  doc.setFontSize(10);
  doc.text("Guide préparatoire personnel", PAGE_WIDTH - MARGIN, 11, { align: "right" });

  doc.setFontSize(8);
  doc.text(
    "Aide carburant grands rouleurs 2026",
    PAGE_WIDTH - MARGIN,
    17,
    { align: "right" },
  );
};

const renderWarningBox = (doc: jsPDF, startY: number): number => {
  const text =
    "DOCUMENT PRÉPARATOIRE PERSONNEL — VERSION PROVISOIRE\n" +
    "Ce guide est un document d'accompagnement produit par UNSAgglo pour vous aider à préparer votre demande. " +
    "Il n'a aucune valeur officielle et se base sur les annonces gouvernementales du 21 avril 2026. " +
    "La demande d'aide carburant doit obligatoirement être effectuée sur le site officiel impots.gouv.fr, " +
    "dans votre espace particulier, à partir de fin mai 2026. " +
    "Une version actualisée sera produite dès publication du décret officiel.";

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const wrapped = doc.splitTextToSize(text, CONTENT_WIDTH - 10);
  const lineHeight = 4;
  const boxHeight = wrapped.length * lineHeight + 8;

  setFill(doc, WARNING_BG);
  doc.rect(MARGIN, startY, CONTENT_WIDTH, boxHeight, "F");

  setFill(doc, RED);
  doc.rect(MARGIN, startY, 1.5, boxHeight, "F");

  setText(doc, WARNING_TEXT);
  doc.text(wrapped, MARGIN + 5, startY + 5);

  return startY + boxHeight + 8;
};

const renderIntro = (doc: jsPDF, startY: number): number => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  setText(doc, MARINE);
  doc.text("Votre situation — Synthèse personnelle", MARGIN, startY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  setText(doc, BLACK);

  const intro =
    "Selon les réponses que vous avez fournies au simulateur UNSAgglo, votre profil correspond aux critères " +
    "d'éligibilité annoncés par le gouvernement le 21 avril 2026. Les informations ci-dessous vous aideront à " +
    "remplir sereinement le formulaire officiel sur impots.gouv.fr — sachant que vous n'aurez qu'UNE SEULE " +
    "information à déclarer : votre kilométrage professionnel.";

  const wrapped = doc.splitTextToSize(intro, CONTENT_WIDTH);
  doc.text(wrapped, MARGIN, startY + 8, { align: "justify", maxWidth: CONTENT_WIDTH });

  return startY + 8 + wrapped.length * 5 + 5;
};

interface TableRow {
  criterion: string;
  render: (doc: jsPDF, x: number, y: number) => void;
}

const renderTable = (
  doc: jsPDF,
  startY: number,
  params: PdfParams,
): number => {
  const leftColWidth = 95;
  const rightColWidth = CONTENT_WIDTH - leftColWidth;
  const rowHeight = 10;

  const rows: TableRow[] = [
    {
      criterion: "Possession d'un véhicule personnel",
      render: (d, x, y) => drawValidatedTag(d, x, y, "Validé"),
    },
    {
      criterion: "Statut professionnel",
      render: (d, x, y) => drawValidatedTag(d, x, y, "Actif"),
    },
    {
      criterion: "Composition du foyer",
      render: (d, x, y) => {
        setText(d, MARINE);
        d.setFont("helvetica", "normal");
        d.setFontSize(10);
        d.text(params.compositionFoyer ?? "—", x, y);
      },
    },
    {
      criterion: "Revenus sous le seuil indicatif applicable",
      render: (d, x, y) => drawValidatedTag(d, x, y, "Validé (sous réserve du décret)"),
    },
    {
      criterion: "Véhicule personnel (pas de véhicule de fonction employeur)",
      render: (d, x, y) => drawValidatedTag(d, x, y, "Validé"),
    },
    {
      criterion: "Kilométrage",
      render: (d, x, y) => {
        setText(d, MARINE);
        d.setFont("helvetica", "normal");
        d.setFontSize(10);
        const text = params.profilKilometrage ?? "—";
        const wrapped = d.splitTextToSize(text, rightColWidth - 5);
        d.text(wrapped, x, y);
      },
    },
  ];

  setDraw(doc, BORDER);
  doc.setLineWidth(0.2);

  // Header row
  setFill(doc, CARD_BG);
  doc.rect(MARGIN, startY, CONTENT_WIDTH, rowHeight, "F");
  setText(doc, MARINE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Critère d'éligibilité", MARGIN + 3, startY + 6.5);
  doc.text("Votre situation", MARGIN + leftColWidth + 3, startY + 6.5);

  // Data rows
  rows.forEach((row, i) => {
    const y = startY + rowHeight * (i + 1);
    // Row separator
    doc.line(MARGIN, y, MARGIN + CONTENT_WIDTH, y);
    setText(doc, BLACK);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const critWrapped = doc.splitTextToSize(row.criterion, leftColWidth - 6);
    doc.text(critWrapped, MARGIN + 3, y + 6);
    row.render(doc, MARGIN + leftColWidth + 3, y + 6);
  });

  const bottomY = startY + rowHeight * (rows.length + 1);
  // Final bottom border
  doc.line(MARGIN, bottomY, MARGIN + CONTENT_WIDTH, bottomY);
  // Left and right vertical borders + middle column separator
  doc.line(MARGIN, startY, MARGIN, bottomY);
  doc.line(MARGIN + CONTENT_WIDTH, startY, MARGIN + CONTENT_WIDTH, bottomY);
  doc.line(
    MARGIN + leftColWidth,
    startY,
    MARGIN + leftColWidth,
    bottomY,
  );
  // Top border
  doc.line(MARGIN, startY, MARGIN + CONTENT_WIDTH, startY);

  return bottomY + 5;
};

const renderPage1Footer = (doc: jsPDF, dateDisplay: string, ref: string): void => {
  const y = PAGE_HEIGHT - 25;
  setDraw(doc, MARINE);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);

  setText(doc, MARINE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(`Référence : ${ref}`, MARGIN, y + 6);
  doc.text(`Édité le ${dateDisplay}`, PAGE_WIDTH - MARGIN, y + 6, { align: "right" });

  setText(doc, MUTED);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(
    "Document généré par UNSAgglo Roissy Pays de France — unsagglo@roissypaysdefrance.fr",
    PAGE_WIDTH / 2,
    y + 13,
    { align: "center" },
  );
  doc.setFont("helvetica", "italic");
  doc.text(
    "Ce document ne constitue ni une demande officielle, ni une attestation juridiquement opposable.",
    PAGE_WIDTH / 2,
    y + 18,
    { align: "center" },
  );
};

const renderPage1 = (doc: jsPDF, params: PdfParams, dateDisplay: string, ref: string): void => {
  renderHeaderBand(doc);
  let y = 32;
  y = renderWarningBox(doc, y);
  y = renderIntro(doc, y);
  renderTable(doc, y, params);
  renderPage1Footer(doc, dateDisplay, ref);
};

const renderSectionHeading = (doc: jsPDF, y: number, text: string): number => {
  setFill(doc, BLUE);
  doc.rect(MARGIN, y - 4, 2, 6, "F");
  setText(doc, BLUE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(text, MARGIN + 5, y);
  return y + 8;
};

const renderSection1 = (doc: jsPDF, startY: number): number => {
  let y = renderSectionHeading(doc, startY, "Les 2 informations à préparer");

  setText(doc, BLACK);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const items = [
    {
      label: "1. Votre numéro fiscal",
      body:
        "il figure sur votre avis d'imposition, en haut à droite dans le cadre « Vos références » " +
        "(ou sur votre page d'accueil impots.gouv.fr si vous êtes déjà connecté).",
    },
    {
      label: "2. Votre kilométrage professionnel annuel",
      body: "selon votre profil :",
    },
  ];

  items.forEach((item) => {
    doc.setFont("helvetica", "bold");
    const labelWidth = doc.getTextWidth(item.label + " — ");
    doc.text(item.label + " — ", MARGIN, y);
    doc.setFont("helvetica", "normal");
    const wrapped = doc.splitTextToSize(item.body, CONTENT_WIDTH - labelWidth);
    doc.text(wrapped, MARGIN + labelWidth, y);
    y += wrapped.length * 5 + 2;
  });

  const subItems = [
    "Si vous êtes sédentaire : la distance (en km) de votre domicile à votre lieu de travail, aller simple (au moins 15 km).",
    "Si vous êtes itinérant : le nombre approximatif de kilomètres parcourus par an à titre professionnel (au moins 8 000 km).",
  ];
  subItems.forEach((s) => {
    const wrapped = doc.splitTextToSize(s, CONTENT_WIDTH - 8);
    setText(doc, BLUE);
    doc.text("•", MARGIN + 3, y);
    setText(doc, BLACK);
    doc.text(wrapped, MARGIN + 8, y);
    y += wrapped.length * 5 + 1;
  });

  y += 5;
  const boxText =
    "Bonne nouvelle — simplicité maximale. " +
    "L'administration fiscale vérifie automatiquement vos revenus (via la DGFIP) et la possession de votre véhicule " +
    "(via la carte grise). Vous n'avez AUCUN justificatif à fournir. Le kilométrage est déclaré sur l'honneur.";
  const boxWrapped = doc.splitTextToSize(boxText, CONTENT_WIDTH - 10);
  const boxH = boxWrapped.length * 5 + 8;
  setFill(doc, LIGHT_BLUE_BG);
  doc.rect(MARGIN, y, CONTENT_WIDTH, boxH, "F");
  setFill(doc, BLUE);
  doc.rect(MARGIN, y, 1.5, boxH, "F");
  setText(doc, MARINE);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(boxWrapped, MARGIN + 5, y + 5);

  return y + boxH + 8;
};

const renderSection2 = (doc: jsPDF, startY: number): number => {
  let y = renderSectionHeading(doc, startY, "Votre engagement sur l'honneur");

  const intro =
    "Lors de votre demande sur impots.gouv.fr, vous déclarerez sur l'honneur :";
  const bullets = [
    "Posséder un véhicule personnel utilisé pour vos trajets domicile-travail ou vos déplacements professionnels.",
    "Ne pas bénéficier d'une prise en charge intégrale du carburant par votre employeur.",
    "Respecter le critère kilométrique (15 km domicile-travail OU 8 000 km/an professionnel).",
  ];
  const warning =
    "Toute fausse déclaration expose aux sanctions prévues à l'article 441-7 du Code pénal " +
    "(1 an d'emprisonnement et 15 000 € d'amende).";

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const introLines = doc.splitTextToSize(intro, CONTENT_WIDTH - 10);
  const bulletLines = bullets.map((b) => doc.splitTextToSize("• " + b, CONTENT_WIDTH - 14));
  const warnLines = doc.splitTextToSize(warning, CONTENT_WIDTH - 10);

  const bulletTotalLines = bulletLines.reduce((n, lines) => n + lines.length, 0);
  const boxH = introLines.length * 5 + bulletTotalLines * 5 + warnLines.length * 5 + 14;

  setFill(doc, CARD_BG);
  doc.rect(MARGIN, y, CONTENT_WIDTH, boxH, "F");
  setDraw(doc, MARINE);
  doc.setLineWidth(0.2);
  doc.rect(MARGIN, y, CONTENT_WIDTH, boxH);

  let boxY = y + 6;
  setText(doc, MARINE);
  doc.text(introLines, MARGIN + 5, boxY);
  boxY += introLines.length * 5 + 2;

  setText(doc, BLACK);
  bulletLines.forEach((lines) => {
    doc.text(lines, MARGIN + 8, boxY);
    boxY += lines.length * 5;
  });

  boxY += 3;
  doc.setFont("helvetica", "italic");
  setText(doc, RED);
  doc.text(warnLines, MARGIN + 5, boxY);
  doc.setFont("helvetica", "normal");

  return y + boxH + 8;
};

const renderSection3 = (doc: jsPDF, startY: number): number => {
  let y = renderSectionHeading(doc, startY, "Où et quand faire votre demande ?");

  setText(doc, BLACK);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const rows: Array<[string, string]> = [
    ["Site officiel", "impots.gouv.fr, dans votre espace particulier"],
    ["Ouverture du formulaire", "fin mai 2026"],
    ["Durée estimée", "3 minutes"],
    ["Versement", "juin 2026, virement sur votre compte bancaire enregistré"],
    [
      "Attention aux arnaques",
      "aucun autre site ne peut traiter cette demande. Méfiez-vous des sollicitations par SMS, email ou téléphone.",
    ],
  ];

  rows.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    const l = `${label} : `;
    doc.text(l, MARGIN, y);
    const labelWidth = doc.getTextWidth(l);
    doc.setFont("helvetica", "normal");
    const wrapped = doc.splitTextToSize(value, CONTENT_WIDTH - labelWidth);
    doc.text(wrapped, MARGIN + labelWidth, y);
    y += wrapped.length * 5 + 2;
  });

  return y + 4;
};

const renderContactBox = (doc: jsPDF, startY: number): number => {
  const boxH = 28;
  setFill(doc, MARINE);
  doc.rect(MARGIN, startY, CONTENT_WIDTH, boxH, "F");

  setText(doc, [255, 255, 255]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Une question sur votre dossier ?", MARGIN + 7, startY + 8);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    "L'équipe UNSAgglo est là pour vous accompagner.",
    MARGIN + 7,
    startY + 15,
  );
  doc.setFont("helvetica", "bold");
  doc.text("Email : unsagglo@roissypaysdefrance.fr", MARGIN + 7, startY + 22);

  return startY + boxH + 6;
};

const renderPage2Footer = (doc: jsPDF): void => {
  const y = PAGE_HEIGHT - 18;
  setDraw(doc, MARINE);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);

  setText(doc, MUTED);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    "UNSAgglo – Roissy Pays de France — Syndicat affilié UNSA Territoriaux",
    PAGE_WIDTH / 2,
    y + 6,
    { align: "center" },
  );
  doc.setFont("helvetica", "italic");
  doc.text("Libres Ensemble", PAGE_WIDTH / 2, y + 11, { align: "center" });
};

const renderPage2 = (doc: jsPDF): void => {
  setText(doc, MARINE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Checklist et mode d'emploi", MARGIN, 25);

  let y = 35;
  y = renderSection1(doc, y);
  y = renderSection2(doc, y);
  y = renderSection3(doc, y);
  renderContactBox(doc, y);
  renderPage2Footer(doc);
};

export async function generateAidePdf(params: PdfParams): Promise<void> {
  const { default: JsPDFCtor } = await import("jspdf");
  const doc = new JsPDFCtor({ unit: "mm", format: "a4", orientation: "portrait" });

  const now = new Date();
  const dateDisplay = formatDateDisplay(now);
  const dateCompact = formatDateCompact(now);
  const ref = `UNSAGGLO-AIDECARB-${dateCompact}-${randomRef()}`;

  renderPage1(doc, params, dateDisplay, ref);
  doc.addPage();
  renderPage2(doc);

  doc.save(`UNSAgglo_Guide_Aide_Carburant_${dateCompact}.pdf`);
}
