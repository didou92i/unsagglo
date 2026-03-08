import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { SectionTitle } from "@/components/sections";
import UButton from "@/components/ui/UButton";
import DocumentsList from "./DocumentsList";
import ProfileCard from "./ProfileCard";

const MembersPage = (): JSX.Element => {
  const { user, logout } = useAuth();
  const { profile } = useProfile();

  const handleLogout = async (): Promise<void> => {
    await logout();
  };

  const displayName = profile?.prenom && profile?.nom
    ? `${profile.prenom} ${profile.nom}`
    : user?.email ?? "";

  return (
    <PageWrapper>
      <MetaTags title="Espace membres" description="Espace membres UNSAgglo" noIndex />
      <section className="px-4 md:px-6 py-12 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-black text-secondary">
              Bonjour{displayName ? `, ${displayName}` : ""}
            </h1>
            <p className="text-muted-foreground text-sm">Espace reserve aux membres UNSAgglo</p>
          </div>
          <UButton variant="outline" size="sm" onClick={handleLogout}>Deconnexion</UButton>
        </div>

        <div className="mb-8">
          <ProfileCard />
        </div>

        <SectionTitle title="Documents syndicaux" align="left" />
        <DocumentsList />
      </section>
    </PageWrapper>
  );
};

export default MembersPage;
