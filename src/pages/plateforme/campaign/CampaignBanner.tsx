import { Megaphone, Calendar, Activity } from "lucide-react";
import { useActiveCampaign } from "./useActiveCampaign";
import { CAMPAIGN_THEME_KEY } from "./types";
import { THEME_VISUAL } from "../wizard/types";

const monthLabel = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d
    .toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
    .toUpperCase();
};

const formatDateFr = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
};

const daysLeft = (iso: string): number => {
  const end = new Date(iso).getTime();
  const now = Date.now();
  const diff = end - now;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

const CampaignBanner = (): JSX.Element | null => {
  const { campaign, loading } = useActiveCampaign();

  if (loading || !campaign) return null;

  const remaining = daysLeft(campaign.end_date);
  const themeMeta = THEME_VISUAL[campaign.theme];
  const ThemeIcon = themeMeta?.icon;

  const handleCta = (): void => {
    try {
      sessionStorage.setItem(CAMPAIGN_THEME_KEY, campaign.theme);
    } catch {
      // sessionStorage unavailable (private mode) — ignore.
    }
    document
      .getElementById("contribution")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="max-w-3xl mx-auto mb-10">
      <div
        className="relative rounded-lg overflow-hidden text-white"
        style={{ backgroundColor: "#29235c" }}
      >
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-1.5"
          style={{ backgroundColor: "#e74124" }}
        />
        <div className="px-6 md:px-8 py-7 md:py-9">
          <p
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: "#009fe3" }}
          >
            <Megaphone className="h-3.5 w-3.5" strokeWidth={2} />
            Cap du mois · {monthLabel(campaign.start_date)}
          </p>

          <h3
            className="font-display font-medium leading-tight flex items-start gap-3"
            style={{ fontSize: "26px" }}
          >
            {ThemeIcon && (
              <ThemeIcon
                className="h-7 w-7 mt-1 flex-shrink-0"
                style={{ color: "#009fe3" }}
                strokeWidth={1.75}
              />
            )}
            <span>{campaign.title}</span>
          </h3>

          {campaign.description && (
            <p className="text-white/85 text-sm mt-3 max-w-2xl leading-relaxed">
              {campaign.description}
            </p>
          )}

          <div className="mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
               style={{ backgroundColor: "rgba(0, 159, 227, 0.15)" }}>
            <Activity
              className="h-3.5 w-3.5 animate-pulse"
              style={{ color: "#009fe3" }}
              strokeWidth={2.25}
            />
            <span className="text-xs font-medium" style={{ color: "#009fe3" }}>
              Mobilisation en cours
            </span>
          </div>

          <div className="mt-5 flex items-center flex-wrap gap-x-5 gap-y-2 text-xs text-white/75">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
              {remaining > 0
                ? `Jusqu'au ${formatDateFr(campaign.end_date)} · J - ${remaining}`
                : "Dernier jour"}
            </span>
            {campaign.deliverable_label && (
              <span>
                Synthèse :{" "}
                <span className="text-white">
                  {campaign.deliverable_label}
                  {campaign.deliverable_date
                    ? ` (${formatDateFr(campaign.deliverable_date)})`
                    : ""}
                </span>
              </span>
            )}
          </div>

          <div className="mt-7">
            <button
              type="button"
              onClick={handleCta}
              className="group inline-flex items-center gap-2 text-white text-sm font-medium rounded-[6px] px-6 py-3 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#009fe3" }}
            >
              <Megaphone
                className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-12"
                strokeWidth={2}
              />
              Je porte ce sujet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignBanner;
