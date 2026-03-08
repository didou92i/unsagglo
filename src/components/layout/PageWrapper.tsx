import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { usePageVisits } from "@/hooks/usePageVisits";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

const PageWrapper = ({ children, className = "" }: PageWrapperProps): JSX.Element => {
  const { pathname } = useLocation();
  usePageVisits();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main className={`pt-16 min-h-screen ${className}`}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default PageWrapper;
