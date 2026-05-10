import fs from "node:fs";
import path from "node:path";

const read = (relativePath: string): string =>
  fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");

describe("P2 members area content integration", () => {
  it("keeps the consolidated v2 content plan in the repository root", () => {
    const plan = read("UNSAgglo_contenu_site_v2.md");

    expect(plan).toContain("Espace adhérent — page /members");
    expect(plan).toContain("Bienvenue dans votre espace UNSAgglo.");
  });

  it("integrates the v2 member services on /members", () => {
    const membersPage = read("src/pages/members/index.tsx");

    expect(membersPage).toContain("Bienvenue dans votre espace UNSAgglo");
    expect(membersPage).toContain("Permanence et accompagnement individuel");
    expect(membersPage).toContain("Plateforme de participation collective");
    expect(membersPage).toContain("Veille juridique et statutaire");
    expect(membersPage).toContain("Accompagnement disciplinaire");
    expect(membersPage).toContain("Suivi CITIS et accident de service / trajet");
    expect(membersPage).toContain("Risques psychosociaux et conditions de travail");
    expect(membersPage).toContain("Tous vos échanges avec UNSAgglo sont strictement confidentiels");
    expect(membersPage).toContain("Aucune information transmise au syndicat");
  });
});
