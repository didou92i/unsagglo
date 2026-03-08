import { Link } from "react-router-dom";

const QUICK_LINKS = [
  { label: "Accueil", to: "/" },
  { label: "Actualites", to: "/news" },
  { label: "Vos Droits", to: "/rights" },
  { label: "Elections 2026", to: "/elections" },
  { label: "Adherer", to: "/membership" },
];

const RIGHTS_LINKS = [
  { label: "CITIS", to: "/rights/citis" },
  { label: "Temps partiel", to: "/rights/temps_partiel" },
  { label: "Carriere", to: "/rights/carriere" },
  { label: "Conges", to: "/rights/conges" },
  { label: "Discipline", to: "/rights/discipline" },
  { label: "RPS", to: "/rights/rps" },
];

const Footer = (): JSX.Element => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-lg font-bold mb-4">Liens rapides</h3>
          <ul className="space-y-2">
            {QUICK_LINKS.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-secondary-foreground/70 hover:text-secondary-foreground text-sm transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg font-bold mb-4">Vos droits</h3>
          <ul className="space-y-2">
            {RIGHTS_LINKS.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-secondary-foreground/70 hover:text-secondary-foreground text-sm transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg font-bold mb-4">Contact</h3>
          <p className="text-secondary-foreground/70 text-sm mb-2">
            Email : <a href="mailto:unsagglo@unsa.org" className="underline hover:text-secondary-foreground">unsagglo@unsa.org</a>
          </p>
          <p className="text-secondary-foreground/70 text-sm mb-4">Permanences : Lundi 12h-13h, Jeudi 17h-18h</p>
          <ul className="space-y-1">
            <li><Link to="/mentions-legales" className="text-secondary-foreground/70 hover:text-secondary-foreground text-sm transition-colors">Mentions legales</Link></li>
            <li><Link to="/mentions-legales" className="text-secondary-foreground/70 hover:text-secondary-foreground text-sm transition-colors">Politique de confidentialite</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10 mt-8 pt-6 text-center text-sm text-secondary-foreground/60 max-w-7xl mx-auto">
        UNSAgglo -- Libres Ensemble {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
