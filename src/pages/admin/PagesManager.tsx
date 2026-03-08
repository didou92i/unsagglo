import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import Spinner from "@/components/ui/Spinner";

interface PageToggleItem {
  key: "page_news" | "page_rights" | "page_elections" | "page_contact" | "page_membership" | "page_members";
  label: string;
  description: string;
}

const PAGES: PageToggleItem[] = [
  { key: "page_news", label: "Actualites", description: "/news" },
  { key: "page_rights", label: "Vos Droits", description: "/rights" },
  { key: "page_elections", label: "Elections 2026", description: "/elections" },
  { key: "page_contact", label: "Contact", description: "/contact" },
  { key: "page_membership", label: "Adhesion", description: "/membership" },
  { key: "page_members", label: "Espace membres", description: "/members" },
];

const PagesManager = (): JSX.Element => {
  const { settings, loading, toggleSetting } = useSiteSettings();

  if (loading) return <Spinner />;

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {PAGES.map((page) => (
          <div key={page.key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <div>
              <Label className="text-base font-display font-bold">{page.label}</Label>
              <p className="text-sm text-muted-foreground">{page.description}</p>
            </div>
            <Switch
              checked={settings[page.key]}
              onCheckedChange={() => toggleSetting(page.key)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PagesManager;
