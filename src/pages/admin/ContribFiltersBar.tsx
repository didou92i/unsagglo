import UButton from "@/components/ui/UButton";
import { THEMES } from "@/constants/themes";
import { STATUTS } from "@/constants/statuts";
import { SERVICE_GROUPS } from "@/constants/services";

interface ContribFiltersBarProps {
  themeFilter: string;
  statutFilter: string;
  serviceFilter: string;
  setThemeFilter: (v: string) => void;
  setStatutFilter: (v: string) => void;
  setServiceFilter: (v: string) => void;
  count: number;
  onExport: () => void;
}

const selectClass = "text-sm border rounded px-2 py-1 bg-background text-foreground";

const ContribFiltersBar = ({
  themeFilter, statutFilter, serviceFilter,
  setThemeFilter, setStatutFilter, setServiceFilter,
  count, onExport,
}: ContribFiltersBarProps): JSX.Element => (
  <div className="flex items-center justify-between flex-wrap gap-2">
    <div className="flex items-center gap-2 flex-wrap">
      <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)} className={selectClass}>
        <option value="">Tous les services</option>
        {SERVICE_GROUPS.map((g) => (
          <optgroup key={g.group} label={g.group}>
            {g.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </optgroup>
        ))}
      </select>
      <select value={themeFilter} onChange={(e) => setThemeFilter(e.target.value)} className={selectClass}>
        <option value="">Tous les themes</option>
        {THEMES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
      </select>
      <select value={statutFilter} onChange={(e) => setStatutFilter(e.target.value)} className={selectClass}>
        <option value="">Tous les statuts</option>
        {STATUTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>
    </div>
    <div className="flex items-center gap-3">
      <p className="text-sm text-muted-foreground">{count} contribution(s)</p>
      <UButton variant="outline" size="sm" onClick={onExport}>Exporter CSV</UButton>
    </div>
  </div>
);

export default ContribFiltersBar;
