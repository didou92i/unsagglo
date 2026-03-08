import { useState, useMemo } from "react";

interface AdherentFilterable {
  service: string | null;
  statut: string;
}

interface UseAdherentFiltersReturn<T extends AdherentFilterable> {
  serviceFilter: string;
  statutFilter: string;
  setServiceFilter: (v: string) => void;
  setStatutFilter: (v: string) => void;
  filtered: T[];
}

export function useAdherentFilters<T extends AdherentFilterable>(
  items: T[]
): UseAdherentFiltersReturn<T> {
  const [serviceFilter, setServiceFilter] = useState<string>("");
  const [statutFilter, setStatutFilter] = useState<string>("");

  const filtered = useMemo(() => {
    return items.filter((a) => {
      if (serviceFilter && a.service !== serviceFilter) return false;
      if (statutFilter && a.statut !== statutFilter) return false;
      return true;
    });
  }, [items, serviceFilter, statutFilter]);

  return { serviceFilter, statutFilter, setServiceFilter, setStatutFilter, filtered };
}
