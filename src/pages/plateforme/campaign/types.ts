export interface ActiveCampaign {
  id: string;
  title: string;
  theme: string;
  description: string | null;
  objective_count: number;
  start_date: string;
  end_date: string;
  deliverable_label: string | null;
  deliverable_date: string | null;
  contribution_count: number;
}

/** SessionStorage key the wizard reads on mount to pre-select a theme. */
export const CAMPAIGN_THEME_KEY = "unsagglo_campaign_theme";
