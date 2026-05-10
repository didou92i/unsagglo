import fs from "node:fs";
import path from "node:path";

const read = (relativePath: string): string =>
  fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");

describe("P2 public content integration", () => {
  it("publishes the Qui sommes-nous route across app, navigation and sitemap", () => {
    expect(read("src/App.tsx")).toContain('path="/qui-sommes-nous"');
    expect(read("src/components/layout/useNavbar.ts")).toContain(
      'to: "/qui-sommes-nous"',
    );
    expect(read("src/components/layout/Footer.tsx")).toContain(
      'to: "/qui-sommes-nous"',
    );
    expect(read("public/sitemap.xml")).toContain(
      "https://unsagglo.fr/qui-sommes-nous",
    );
  });

  it("integrates the detailed adhesion FAQ from the v2 content plan", () => {
    const membershipPage = read("src/pages/membership/index.tsx");

    expect(membershipPage).toContain("Questions fréquentes sur l'adhésion");
    expect(membershipPage).toContain("Mon employeur saura-t-il que j'adhère ?");
    expect(membershipPage).toContain("case 7AC");
    expect(membershipPage).toContain("Démission UNSAgglo");
  });

  it("uses the structured contact object selector for incoming messages", () => {
    const contactOptions = read("src/pages/contact/contactOptions.ts");
    const contactSchema = read("src/pages/contact/useContact.ts");

    expect(contactOptions).toContain("Convocation disciplinaire ou entretien préalable");
    expect(contactOptions).toContain("Désaccord sur la paie ou le régime indemnitaire");
    expect(contactOptions).toContain("Devenir candidat sur la liste UNSAgglo");
    expect(contactOptions).toContain("accompagnement_disciplinaire");
    expect(contactOptions).toContain("programme_elections");
    expect(contactSchema).toContain("CONTACT_OBJECT_VALUES");
  });
});
