import type { jsPDF } from "jspdf";
import logoUrl from "@/assets/unsa-logo.png";

export interface PdfParams {
  compositionFoyer: string | null;
  profilKilometrage: string | null;
}

const IMPOTS_URL = "https://www.impots.gouv.fr";
const UNSAGGLO_EMAIL = "unsagglo@roissypaysdefrance.fr";

const loadLogo = (): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Impossible de charger le logo"));
    img.src = logoUrl;
  });

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

const HEADER_HEIGHT = 28;
const LOGO_SIZE = 20;

const renderHeaderBand = (doc: jsPDF, logo: HTMLImageElement | null): void => {
  setFill(doc, MARINE);
  doc.rect(0, 0, PAGE_WIDTH, HEADER_HEIGHT, "F");

  if (logo) {
    const logoY = (HEADER_HEIGHT - LOGO_SIZE) / 2;
    doc.addImage(logo, "PNG", MARGIN, logoY, LOGO_SIZE, LOGO_SIZE);
  }

  const textLeft = MARGIN + LOGO_SIZE + 6;
  setText(doc, [255, 255, 255]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("UNSAgglo", textLeft, 13);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(
    "Communauté d'Agglomération Roissy Pays de France",
    textLeft,
    18,
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Guide préparatoire personnel", PAGE_WIDTH - MARGIN, 13, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(
    "Aide carburant grands rouleurs 2026",
    PAGE_WIDTH - MARGIN,
    18,
    { align: "right" },
  );
};

interface FooterContext {
  pageNum: number;
  totalPages: number;
  ref: string;
  dateDisplay: string;
}

const renderFooter = (doc: jsPDF, ctx: FooterContext): void => {
  const y = PAGE_HEIGHT - 18;
  setDraw(doc, MARINE);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);

  setText(doc, MUTED);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  doc.text(`Réf. ${ctx.ref}`, MARGIN, y + 6);
  doc.text(
    `UNSAgglo — Syndicat UNSA Territoriaux de la CARPF`,
    PAGE_WIDTH / 2,
    y + 6,
    { align: "center" },
  );
  doc.text(
    `Page ${ctx.pageNum} / ${ctx.totalPages}`,
    PAGE_WIDTH - MARGIN,
    y + 6,
    { align: "right" },
  );

  doc.setFont("helvetica", "italic");
  doc.text(`Édité le ${ctx.dateDisplay} — Libres Ensemble`, PAGE_WIDTH / 2, y + 11, {
    align: "center",
  });
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
    "Ce guide personnel a été préparé par UNSAgglo pour les agents de la Communauté d'Agglomération " +
    "Roissy Pays de France. D'après les réponses que vous avez fournies au simulateur, votre profil " +
    "correspond aux critères d'éligibilité annoncés par le gouvernement le 21 avril 2026. Les informations " +
    "ci-dessous vous aideront à remplir sereinement le formulaire officiel sur impots.gouv.fr — vous n'aurez " +
    "qu'UNE SEULE information à déclarer : votre kilométrage professionnel.";

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
      criterion: "Agent territorial en activité à la CARPF",
      render: (d, x, y) => drawValidatedTag(d, x, y, "Validé"),
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
      criterion: "Pas de véhicule de fonction avec carte carburant employeur",
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

const renderPage1 = (
  doc: jsPDF,
  params: PdfParams,
  logo: HTMLImageElement | null,
): number => {
  renderHeaderBand(doc, logo);
  let y = HEADER_HEIGHT + 7;
  y = renderWarningBox(doc, y);
  y = renderIntro(doc, y);
  return renderTable(doc, y, params);
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

  interface SiteRow {
    label: string;
    render: (x: number, cursorY: number) => number;
  }

  const rows: SiteRow[] = [
    {
      label: "Site officiel",
      render: (x, cy) => {
        doc.setFont("helvetica", "normal");
        doc.textWithLink("impots.gouv.fr", x, cy, { url: IMPOTS_URL });
        const linkW = doc.getTextWidth("impots.gouv.fr");
        const rest = ", dans votre espace particulier";
        const wrapped = doc.splitTextToSize(rest, CONTENT_WIDTH - x - linkW + MARGIN);
        doc.text(wrapped, x + linkW, cy);
        return wrapped.length * 5;
      },
    },
    {
      label: "Ouverture du formulaire",
      render: (x, cy) => {
        doc.setFont("helvetica", "normal");
        const wrapped = doc.splitTextToSize(
          "fin mai 2026",
          CONTENT_WIDTH - x + MARGIN,
        );
        doc.text(wrapped, x, cy);
        return wrapped.length * 5;
      },
    },
    {
      label: "Durée estimée",
      render: (x, cy) => {
        doc.setFont("helvetica", "normal");
        doc.text("3 minutes", x, cy);
        return 5;
      },
    },
    {
      label: "Versement",
      render: (x, cy) => {
        doc.setFont("helvetica", "normal");
        const wrapped = doc.splitTextToSize(
          "juin 2026, virement sur votre compte bancaire enregistré",
          CONTENT_WIDTH - x + MARGIN,
        );
        doc.text(wrapped, x, cy);
        return wrapped.length * 5;
      },
    },
    {
      label: "Attention aux arnaques",
      render: (x, cy) => {
        doc.setFont("helvetica", "normal");
        const wrapped = doc.splitTextToSize(
          "aucun autre site ne peut traiter cette demande. Méfiez-vous des sollicitations par SMS, email ou téléphone.",
          CONTENT_WIDTH - x + MARGIN,
        );
        doc.text(wrapped, x, cy);
        return wrapped.length * 5;
      },
    },
  ];

  rows.forEach((row) => {
    doc.setFont("helvetica", "bold");
    const l = `${row.label} : `;
    doc.text(l, MARGIN, y);
    const labelWidth = doc.getTextWidth(l);
    const consumed = row.render(MARGIN + labelWidth, y);
    y += consumed + 2;
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
  doc.textWithLink(`Email : ${UNSAGGLO_EMAIL}`, MARGIN + 7, startY + 22, {
    url: `mailto:${UNSAGGLO_EMAIL}`,
  });

  return startY + boxH + 6;
};

const renderPage2 = (doc: jsPDF, logo: HTMLImageElement | null): void => {
  renderHeaderBand(doc, logo);

  setText(doc, MARINE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Checklist et mode d'emploi", MARGIN, HEADER_HEIGHT + 12);

  let y = HEADER_HEIGHT + 22;
  y = renderSection1(doc, y);
  y = renderSection2(doc, y);
  y = renderSection3(doc, y);
  renderContactBox(doc, y);
};

const renderAccompagnement = (doc: jsPDF, startY: number): number => {
  let y = renderSectionHeading(doc, startY, "UNSAgglo vous accompagne");

  setText(doc, BLACK);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const intro =
    "En tant qu'agent de la Communauté d'Agglomération Roissy Pays de France, vous pouvez " +
    "solliciter UNSAgglo à chaque étape de votre démarche :";
  const wrapped = doc.splitTextToSize(intro, CONTENT_WIDTH);
  doc.text(wrapped, MARGIN, y);
  y += wrapped.length * 5 + 2;

  const bullets = [
    "Aide à la vérification de votre éligibilité sur la base de votre avis d'imposition",
    "Assistance en cas de difficulté de connexion ou de saisie sur impots.gouv.fr",
    "Accompagnement en cas de refus ou de contestation de la décision fiscale",
    "Relais auprès de la direction RH de la CARPF si besoin d'information sur la prime transport employeur",
  ];
  bullets.forEach((b) => {
    const lines = doc.splitTextToSize(b, CONTENT_WIDTH - 8);
    setText(doc, BLUE);
    doc.text("•", MARGIN + 3, y);
    setText(doc, BLACK);
    doc.text(lines, MARGIN + 8, y);
    y += lines.length * 5 + 1;
  });

  return y + 4;
};

const renderRefusLetter = (doc: jsPDF, startY: number): number => {
  let y = renderSectionHeading(doc, startY, "Courrier type — recours gracieux en cas de refus");

  setText(doc, MUTED);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9.5);
  const note =
    "Modèle à adapter. Transmettez une copie à UNSAgglo pour relecture avant envoi. " +
    "Envoi recommandé avec accusé de réception au Service des impôts des particuliers (SIP) " +
    "dont vous dépendez, dans les deux mois suivant la notification de refus.";
  const noteLines = doc.splitTextToSize(note, CONTENT_WIDTH);
  doc.text(noteLines, MARGIN, y);
  y += noteLines.length * 4 + 4;

  // Fixed-height letter card for a clean administrative layout.
  const innerX = MARGIN + 6;
  const innerWidth = CONTENT_WIDTH - 12;
  const boxTop = y;
  const boxBottom = PAGE_HEIGHT - 30;
  const boxH = boxBottom - boxTop;

  setFill(doc, CARD_BG);
  doc.rect(MARGIN, boxTop, CONTENT_WIDTH, boxH, "F");
  setDraw(doc, MARINE);
  doc.setLineWidth(0.2);
  doc.rect(MARGIN, boxTop, CONTENT_WIDTH, boxH);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  setText(doc, BLACK);

  let cy = boxTop + 7;

  // Sender (top-left)
  doc.setFont("helvetica", "italic");
  setText(doc, MUTED);
  doc.text("[Nom Prénom]", innerX, cy);
  doc.text("[Adresse]", innerX, cy + 4);
  doc.text("[Code postal — Ville]", innerX, cy + 8);

  // Recipient (top-right)
  const rightX = MARGIN + CONTENT_WIDTH - 6;
  doc.text("Service des impôts des particuliers", rightX, cy, { align: "right" });
  doc.text("[Adresse du SIP]", rightX, cy + 4, { align: "right" });
  doc.text("[Code postal — Ville]", rightX, cy + 8, { align: "right" });

  cy += 18;

  // Date + place
  setText(doc, BLACK);
  doc.setFont("helvetica", "normal");
  doc.text("Fait à [VILLE], le [DATE]", rightX, cy, { align: "right" });
  cy += 10;

  // Object + reference
  doc.setFont("helvetica", "bold");
  doc.text("Objet :", innerX, cy);
  doc.setFont("helvetica", "normal");
  doc.text("recours gracieux — refus d'aide carburant 2026", innerX + 12, cy);
  cy += 5;
  doc.setFont("helvetica", "bold");
  doc.text("Réf. :", innerX, cy);
  doc.setFont("helvetica", "normal");
  doc.text("[Numéro fiscal] · dossier [RÉFÉRENCE DOSSIER]", innerX + 12, cy);
  cy += 7;

  // Body
  const body =
    "Madame, Monsieur,\n\n" +
    "J'ai l'honneur de solliciter le réexamen de ma demande d'aide carburant « grands rouleurs » " +
    "2026, déposée le [DATE DÉPÔT] sur mon espace particulier impots.gouv.fr et qui m'a été " +
    "refusée le [DATE REFUS].\n\n" +
    "Agent de la Communauté d'Agglomération Roissy Pays de France, je remplis les conditions " +
    "d'éligibilité :\n" +
    "• véhicule personnel dont je finance moi-même le carburant ;\n" +
    "• [DISTANCE] km domicile-travail (aller simple) / [KILOMÉTRAGE] km/an professionnels ;\n" +
    "• revenu fiscal de référence [ANNÉE] : [MONTANT] €, foyer de [NB] part(s).\n\n" +
    "Je sollicite par conséquent le réexamen de mon dossier et la révision de cette décision. " +
    "Mon organisation syndicale UNSAgglo peut être contactée pour toute information complémentaire.\n\n" +
    "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.";

  const bodyLines = doc.splitTextToSize(body, innerWidth);
  doc.text(bodyLines, innerX, cy);
  cy += bodyLines.length * 4.2 + 8;

  // Signature
  doc.text("Signature", rightX - 10, cy, { align: "right" });
  doc.setDrawColor(120, 120, 120);
  doc.setLineWidth(0.2);
  doc.line(rightX - 35, cy + 2, rightX, cy + 2);

  return boxBottom + 4;
};

const renderPage3 = (doc: jsPDF, logo: HTMLImageElement | null): void => {
  renderHeaderBand(doc, logo);

  setText(doc, MARINE);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Ressources & courrier type", MARGIN, HEADER_HEIGHT + 12);

  let y = HEADER_HEIGHT + 22;
  y = renderAccompagnement(doc, y);
  renderRefusLetter(doc, y);
};

export async function generateAidePdf(params: PdfParams): Promise<void> {
  const { default: JsPDFCtor } = await import("jspdf");
  const doc = new JsPDFCtor({ unit: "mm", format: "a4", orientation: "portrait" });

  const now = new Date();
  const dateDisplay = formatDateDisplay(now);
  const dateCompact = formatDateCompact(now);
  const ref = `UNSAGGLO-AIDECARB-${dateCompact}-${randomRef()}`;

  let logo: HTMLImageElement | null = null;
  try {
    logo = await loadLogo();
  } catch {
    // Silently degrade to text-only header if the logo asset fails to load.
  }

  renderPage1(doc, params, logo);
  doc.addPage();
  renderPage2(doc, logo);
  doc.addPage();
  renderPage3(doc, logo);

  const totalPages = 3;
  for (let i = 1; i <= totalPages; i += 1) {
    doc.setPage(i);
    renderFooter(doc, { pageNum: i, totalPages, ref, dateDisplay });
  }

  doc.save(`UNSAgglo_Guide_Aide_Carburant_${dateCompact}.pdf`);
}
