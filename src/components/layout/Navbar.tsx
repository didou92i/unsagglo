import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import UButton from "@/components/ui/UButton";
import UBadge from "@/components/ui/UBadge";
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
  { label: "Contact", to: "/contact", settingKey: "page_contact" },
];

const Navbar = (): JSX.Element => {
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

  return (
    <nav className="fixed top-0 left-0 w-full bg-secondary z-50 shadow-md h-16">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex flex-col">
          <span className="font-display text-2xl font-black text-secondary-foreground">UNSAgglo</span>
          <span className="text-xs text-secondary-foreground/70 -mt-1">Roissy Pays de France</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${pathname === link.to ? "text-secondary-foreground underline decoration-primary decoration-2 underline-offset-4" : "text-secondary-foreground/80 hover:text-secondary-foreground"}`}
            >
              {link.label}
              {link.badge && <UBadge variant="danger">Dec. 2026</UBadge>}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {isAdmin && <Link to="/admin"><UButton variant="outline" size="sm">Admin</UButton></Link>}
          <Link to="/membership"><UButton variant="primary" size="sm">Adherer</UButton></Link>
          <Link to="/members"><UButton variant="outline" size="sm">Espace membres</UButton></Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-secondary-foreground p-2"
          aria-label="Menu"
        >
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-secondary border-t border-secondary-foreground/10 px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)} className="text-secondary-foreground/90 hover:text-secondary-foreground font-semibold text-sm py-2 flex items-center gap-2">
              {link.label}
              {link.badge && <UBadge variant="danger">Dec. 2026</UBadge>}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-2">
            {isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)}><UButton variant="outline" size="sm" className="w-full">Admin</UButton></Link>}
            <Link to="/membership" onClick={() => setIsOpen(false)}><UButton variant="primary" size="sm" className="w-full">Adherer</UButton></Link>
            <Link to="/members" onClick={() => setIsOpen(false)}><UButton variant="outline" size="sm" className="w-full">Espace membres</UButton></Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
