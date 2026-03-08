import { Navigate } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import PageLoader from "@/components/ui/PageLoader";
import type { ReactNode } from "react";

interface PageGuardProps {
  settingKey: string;
  children: ReactNode;
}

const PageGuard = ({ settingKey, children }: PageGuardProps): JSX.Element => {
  const { settings, loading } = useSiteSettings();

  if (loading) return <PageLoader />;

  const isEnabled = settings[settingKey as keyof typeof settings];
  if (isEnabled === false) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default PageGuard;
