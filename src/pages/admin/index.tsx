import { useNavigate } from "react-router-dom";
import { MetaTags } from "@/components/seo";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import PageLoader from "@/components/ui/PageLoader";
import AdherentsManager from "./AdherentsManager";
import ArticlesManager from "./ArticlesManager";
import DocumentsManager from "./DocumentsManager";
import VisitsStats from "./VisitsStats";
import PagesManager from "./PagesManager";
import SondagesManager from "./SondagesManager";
import CandidatsManager from "./CandidatsManager";
import ContributionsManager from "./ContributionsManager";
import ContactManager from "./ContactManager";
import CaptationsManager from "./captations/CaptationsManager";

const firstNameFromEmail = (email: string | null | undefined): string => {
  if (!email) return "administrateur";
  const local = email.split("@")[0] ?? "";
  if (!local) return "administrateur";
  return local.charAt(0).toUpperCase() + local.slice(1);
};

const AdminPage = (): JSX.Element => {
  const { isAdmin, loading } = useAdmin();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) return <PageLoader />;
  if (!isAdmin) return <Navigate to="/" replace />;

  const handleLogout = async (): Promise<void> => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <>
      <MetaTags
        title="Administration"
        description="Panneau d'administration UNSAgglo"
        noIndex
      />

      <div
        className="w-full text-white"
        style={{ backgroundColor: "#29235c" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-display font-medium text-lg md:text-xl">
              Administration UNSAgglo
            </p>
            <p className="text-xs text-white/70">Roissy Pays de France</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm hidden sm:block">
              Bonjour {firstNameFromEmail(user?.email)}
            </p>
            <button
              type="button"
              onClick={() => void handleLogout()}
              className="text-sm text-white border border-white/40 rounded-[6px] px-3 py-1.5 hover:bg-white hover:text-secondary transition-colors"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <Tabs defaultValue="captations">
          <TabsList className="mb-6 flex-wrap">
            <TabsTrigger value="captations">Captations Aide Carburant</TabsTrigger>
            <TabsTrigger value="adherents">Adherents</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
            <TabsTrigger value="sondages">Sondages</TabsTrigger>
            <TabsTrigger value="candidats">Candidats liste</TabsTrigger>
            <TabsTrigger value="contact">Messages contact</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
          </TabsList>

          <TabsContent value="captations"><CaptationsManager /></TabsContent>
          <TabsContent value="adherents"><AdherentsManager /></TabsContent>
          <TabsContent value="articles"><ArticlesManager /></TabsContent>
          <TabsContent value="documents"><DocumentsManager /></TabsContent>
          <TabsContent value="contributions"><ContributionsManager /></TabsContent>
          <TabsContent value="sondages"><SondagesManager /></TabsContent>
          <TabsContent value="candidats"><CandidatsManager /></TabsContent>
          <TabsContent value="contact"><ContactManager /></TabsContent>
          <TabsContent value="stats"><VisitsStats /></TabsContent>
          <TabsContent value="pages"><PagesManager /></TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default AdminPage;
