import { ORG_INFO } from "@/lib/orgInfo";
import llmHtml from "../../public/llm.html?raw";

describe("P1 legal public content", () => {
  it("uses UNSAgglo legal identity as the public source of truth", () => {
    const org = ORG_INFO as typeof ORG_INFO & {
      nature?: string;
      directeurPublication?: string;
      federation?: string;
      unionRegionale?: string;
    };

    expect(org.nom).toBe("UNSAgglo — Roissy Pays de France");
    expect(org.nature).toBe("Syndicat professionnel");
    expect(org.directeurPublication).toBe("Rhiad AZZABI");
    expect(org.adresse).toEqual({
      ligne1: "32 rue de la Briqueterie",
      cp: "95380",
      ville: "Louvres",
    });
    expect(org.federation).toContain("UNSA Territoriaux");
    expect(org.unionRegionale).toContain("URTIF");
  });

  it("keeps llm.html aligned with the P1 legal scope", () => {
    expect(llmHtml).toContain("Syndicat professionnel");
    expect(llmHtml).toContain("32 rue de la Briqueterie");
    expect(llmHtml).toContain("95380 Louvres");
    expect(llmHtml).toContain("Communauté d'Agglomération Roissy Pays de France");
    expect(llmHtml).not.toMatch(/\bDDT\b|\bDRIHL\b/);
    expect(llmHtml).not.toMatch(/section syndicale/i);
    expect(llmHtml).not.toContain("Roissy-en-France");
  });
});
