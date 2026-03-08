import { Link } from "react-router-dom";
import UButton from "@/components/ui/UButton";
import UBadge from "@/components/ui/UBadge";

interface NavLink {
  label: string;
  to: string;
  badge?: boolean;
}

interface MobileMenuProps {
  links: NavLink[];
  isAdmin: boolean;
  showMembership: boolean;
  showMembers: boolean;
  onClose: () => void;
}

const MobileMenu = ({ links, isAdmin, showMembership, showMembers, onClose }: MobileMenuProps): JSX.Element => (
  <div className="lg:hidden bg-secondary border-t border-secondary-foreground/10 px-4 py-4 flex flex-col gap-3">
    {links.map((link) => (
      <Link key={link.to} to={link.to} onClick={onClose} className="text-secondary-foreground/90 hover:text-secondary-foreground font-semibold text-sm py-2 flex items-center gap-2">
        {link.label}
        {link.badge && <UBadge variant="danger">Dec. 2026</UBadge>}
      </Link>
    ))}
    <div className="flex flex-col gap-2 mt-2">
      {isAdmin && <Link to="/admin" onClick={onClose}><UButton variant="outline" size="sm" className="w-full">Admin</UButton></Link>}
      {showMembership && <Link to="/membership" onClick={onClose}><UButton variant="primary" size="sm" className="w-full">Adherer</UButton></Link>}
      {showMembers && <Link to="/members" onClick={onClose}><UButton variant="outline" size="sm" className="w-full">Espace membres</UButton></Link>}
    </div>
  </div>
);

export default MobileMenu;
