import Spinner from "./Spinner";

const PageLoader = (): JSX.Element => (
  <div className="bg-muted min-h-screen flex flex-col items-center justify-center gap-4">
    <Spinner size="lg" />
    <p className="text-muted-foreground text-sm">Chargement en cours...</p>
  </div>
);

export default PageLoader;
