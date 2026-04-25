export interface Campaign {
  id: string;
  title: string;
  theme: string;
  description: string | null;
  objective_count: number;
  start_date: string;
  end_date: string;
  deliverable_label: string | null;
  deliverable_date: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CampaignInput {
  title: string;
  theme: string;
  description: string | null;
  objective_count: number;
  start_date: string;
  end_date: string;
  deliverable_label: string | null;
  deliverable_date: string | null;
  active: boolean;
}
