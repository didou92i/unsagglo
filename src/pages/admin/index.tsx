import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAdmin } from "@/hooks/useAdmin";
import { Navigate } from "react-router-dom";
import PageLoader from "@/components/ui/PageLoader";
import AdherentsManager from "./AdherentsManager";
import ArticlesManager from "./ArticlesManager";
import VisitsStats from "./VisitsStats";
import PagesManager from "./PagesManager";

const AdminPage = (): JSX.Element => {
  const { isAdmin, loading } = useAdmin();

  if (loading) return <PageLoader />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <PageWrapper>
      <MetaTags title="Administration | UNSAgglo" description="Panneau d'administration" />
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="font-display text-3xl font-black text-foreground mb-8">Administration</h1>

        <Tabs defaultValue="adherents">
          <TabsList className="mb-6">
            <TabsTrigger value="adherents">Adherents</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
          </TabsList>

          <TabsContent value="adherents">
            <AdherentsManager />
          </TabsContent>
          <TabsContent value="articles">
            <ArticlesManager />
          </TabsContent>
          <TabsContent value="stats">
            <VisitsStats />
          </TabsContent>
          <TabsContent value="pages">
            <PagesManager />
          </TabsContent>
        </Tabs>
      </section>
    </PageWrapper>
  );
};

export default AdminPage;
