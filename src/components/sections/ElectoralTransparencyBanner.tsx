import { Info } from "lucide-react";

interface ElectoralTransparencyBannerProps {
  className?: string;
  compact?: boolean;
}

const ELECTORAL_TRANSPARENCY_TEXT =
  "UNSAgglo se présente pour la première fois aux élections professionnelles de décembre 2026. Notre syndicat est juridiquement constitué depuis le 9 janvier 2026 — statuts déposés, bureau élu, affiliation à la Fédération UNSA Territoriaux et à l'URTIF effective. Nous n'avons pas encore d'élu au CST de la CARPF, et c'est précisément l'horizon que nous nous donnons : porter, dès décembre 2026, une représentation locale, multi-filières et indépendante des agents de l'agglomération.";

const ElectoralTransparencyBanner = ({
  className = "",
  compact = false,
}: ElectoralTransparencyBannerProps): JSX.Element => (
  <aside
    className={`rounded-md border p-4 md:p-5 text-sm leading-relaxed flex items-start gap-3 ${className}`}
    style={{
      backgroundColor: "#eff9fe",
      borderColor: "#bfe8fb",
      color: "#29235c",
    }}
  >
    <Info
      className="h-4 w-4 flex-shrink-0 mt-0.5"
      style={{ color: "#009fe3" }}
      strokeWidth={1.9}
      aria-hidden="true"
    />
    <div>
      {!compact && (
        <p className="font-display text-base font-medium mb-1">
          Transparence électorale
        </p>
      )}
      <p className="text-muted-foreground">{ELECTORAL_TRANSPARENCY_TEXT}</p>
    </div>
  </aside>
);

export default ElectoralTransparencyBanner;
