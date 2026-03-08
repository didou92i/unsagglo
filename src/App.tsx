import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import PageLoader from "@/components/ui/PageLoader";
import ProtectedRoute from "@/router/ProtectedRoute";

const Home = React.lazy(() => import("@/pages/home"));
const News = React.lazy(() => import("@/pages/news"));
const ArticleDetail = React.lazy(() => import("@/pages/news/ArticleDetail"));
const Rights = React.lazy(() => import("@/pages/rights"));
const CitisDetail = React.lazy(() => import("@/pages/rights/citis"));
const RightsDetail = React.lazy(() => import("@/pages/rights/RightsDetail"));
const Elections = React.lazy(() => import("@/pages/elections"));
const Membership = React.lazy(() => import("@/pages/membership"));
const Members = React.lazy(() => import("@/pages/members"));
const Login = React.lazy(() => import("@/pages/auth/login"));
const Register = React.lazy(() => import("@/pages/auth/register"));
const Contact = React.lazy(() => import("@/pages/contact"));
const Legal = React.lazy(() => import("@/pages/legal"));
const Admin = React.lazy(() => import("@/pages/admin"));

const queryClient = new QueryClient();

const NotFound = (): JSX.Element => (
  <div className="flex min-h-screen items-center justify-center bg-background px-4">
    <div className="text-center">
      <h1 className="font-display text-5xl font-black text-primary mb-4">404</h1>
      <p className="text-xl text-foreground mb-6">Page introuvable</p>
      <a href="/" className="bg-primary text-primary-foreground font-display font-bold px-6 py-3 rounded-[var(--radius-md)] inline-block">
        Retour a l'accueil
      </a>
    </div>
  </div>
);

const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<ArticleDetail />} />
              <Route path="/rights" element={<Rights />} />
              <Route path="/rights/citis" element={<CitisDetail />} />
              <Route path="/rights/:categorie" element={<RightsDetail />} />
              <Route path="/elections" element={<Elections />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="/mentions-legales" element={<Legal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
