import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface NavLink {
  label: string;
  to: string;
  badge?: boolean;
  settingKey?: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Accueil", to: "/" },
  { label: "Actualites", to: "/news", settingKey: "page_news" },
  { label: "Vos Droits", to: "/rights", settingKey: "page_rights" },
  { label: "Elections 2026", to: "/elections", badge: true, settingKey: "page_elections" },
  { label: "Plateforme", to: "/plateforme", settingKey: "page_plateforme" },
  { label: "Contact", to: "/contact", settingKey: "page_contact" },
];

interface UseNavbarReturn {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  toggle: () => void;
  pathname: string;
  isAdmin: boolean;
  settings: {
    page_news: boolean;
    page_rights: boolean;
    page_elections: boolean;
    page_contact: boolean;
    page_membership: boolean;
    page_members: boolean;
    page_plateforme: boolean;
  };
  visibleLinks: NavLink[];
}

export function useNavbar(): UseNavbarReturn {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { pathname } = useLocation();
  const { isAdmin } = useAdmin();
  const { settings } = useSiteSettings();

  const visibleLinks = useMemo(() => {
    return NAV_LINKS.filter((link) => {
      if (!link.settingKey) return true;
      return settings[link.settingKey as keyof typeof settings] !== false;
    });
  }, [settings]);

  const toggle = (): void => setIsOpen(!isOpen);

  return { isOpen, setIsOpen, toggle, pathname, isAdmin, settings, visibleLinks };
}
