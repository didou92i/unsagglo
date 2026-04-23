import { Link } from "react-router-dom";
import UButton from "@/components/ui/UButton";
import UBadge from "@/components/ui/UBadge";
import MobileMenu from "./MobileMenu";
import { useNavbar } from "./useNavbar";

const Navbar = (): JSX.Element => {
  const { isOpen, setIsOpen, toggle, pathname, isAdmin, settings, visibleLinks } = useNavbar();

  return (
    <nav className="fixed top-0 left-0 w-full bg-secondary z-50 shadow-md h-16">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex flex-col">
          <span className="font-display text-2xl font-black text-secondary-foreground">UNSAgglo</span>
          <span className="text-xs text-secondary-foreground/70 -mt-1">Roissy Pays de France</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {visibleLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${pathname === link.to ? "text-secondary-foreground underline decoration-primary decoration-2 underline-offset-4" : "text-secondary-foreground/80 hover:text-secondary-foreground"}`}
            >
              {link.label}
              {link.badge && <UBadge variant={link.badge.variant}>{link.badge.label}</UBadge>}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {isAdmin && <Link to="/admin"><UButton variant="outline" size="sm">Admin</UButton></Link>}
          {settings.page_membership && <Link to="/membership"><UButton variant="primary" size="sm">Adherer</UButton></Link>}
          {settings.page_members && <Link to="/members"><UButton variant="outline" size="sm">Espace membres</UButton></Link>}
        </div>

        <button onClick={toggle} className="lg:hidden text-secondary-foreground p-2" aria-label="Menu">
          {isOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {isOpen && (
        <MobileMenu
          links={visibleLinks}
          isAdmin={isAdmin}
          showMembership={!!settings.page_membership}
          showMembers={!!settings.page_members}
          onClose={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
