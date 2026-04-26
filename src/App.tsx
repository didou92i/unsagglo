import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import PageLoader from "@/components/ui/PageLoader";
import ProtectedRoute from "@/router/ProtectedRoute";
import AdminProtectedRoute from "@/router/AdminProtectedRoute";
import PageGuard from "@/router/PageGuard";

const Home = React.lazy(() => import("@/pages/home"));
const News = React.lazy(() => import("@/pages/news"));
const ArticleDetail = React.lazy(() => import("@/pages/news/ArticleDetail"));
const Rights = React.lazy(() => import("@/pages/rights"));
const CitisDetail = React.lazy(() => import("@/pages/rights/citis"));
const RightsDetail = React.lazy(() => import("@/pages/rights/RightsDetail"));
const Elections = React.lazy(() => import("@/pages/elections"));
const Plateforme = React.lazy(() => import("@/pages/plateforme"));
const Membership = React.lazy(() => import("@/pages/membership"));
const Members = React.lazy(() => import("@/pages/members"));
const Login = React.lazy(() => import("@/pages/auth/login"));
const Register = React.lazy(() => import("@/pages/auth/register"));
const Contact = React.lazy(() => import("@/pages/contact"));
const AideCarburant = React.lazy(() => import("@/pages/aide-carburant"));
const Legal = React.lazy(() => import("@/pages/legal"));
const Privacy = React.lazy(() => import("@/pages/legal/PrivacyPage"));
const Admin = React.lazy(() => import("@/pages/admin"));
const AdminLogin = React.lazy(() => import("@/pages/admin/login"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<PageGuard settingKey="page_news"><News /></PageGuard>} />
              <Route path="/news/:slug" element={<PageGuard settingKey="page_news"><ArticleDetail /></PageGuard>} />
              <Route path="/rights" element={<PageGuard settingKey="page_rights"><Rights /></PageGuard>} />
              <Route path="/rights/citis" element={<PageGuard settingKey="page_rights"><CitisDetail /></PageGuard>} />
              <Route path="/rights/:categorie" element={<PageGuard settingKey="page_rights"><RightsDetail /></PageGuard>} />
              <Route path="/elections" element={<PageGuard settingKey="page_elections"><Elections /></PageGuard>} />
              <Route path="/plateforme" element={<PageGuard settingKey="page_plateforme"><Plateforme /></PageGuard>} />
              <Route path="/membership" element={<PageGuard settingKey="page_membership"><Membership /></PageGuard>} />
              <Route path="/members" element={<ProtectedRoute><PageGuard settingKey="page_members"><Members /></PageGuard></ProtectedRoute>} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/aide-carburant" element={<PageGuard settingKey="page_aide_carburant"><AideCarburant /></PageGuard>} />
              <Route path="/contact" element={<PageGuard settingKey="page_contact"><Contact /></PageGuard>} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminProtectedRoute><Admin /></AdminProtectedRoute>} />
              <Route path="/mentions-legales" element={<Legal />} />
              <Route path="/politique-confidentialite" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
