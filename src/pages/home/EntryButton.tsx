import useEntryHover from "@/pages/home/useEntryHover";
import VisiteurDialog from "@/pages/home/VisiteurDialog";

const BASE_CLASSES =
  "px-8 py-3 text-base font-display font-bold tracking-widest uppercase bg-transparent border-2 border-primary text-primary rounded-full transition-all duration-300 hover:bg-primary/10 hover:shadow-lg cursor-pointer";

const EntryButton = (): JSX.Element => {
  const {
    hovered,
    visiteurOpen,
    onMouseEnter,
    onMouseLeave,
    setVisiteurOpen,
    goToMembers,
    goToElections,
  } = useEntryHover();

  return (
    <>
      <div
        className="relative z-10 flex items-center justify-center gap-4 animate-fade-in-up [animation-delay:200ms]"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          className={`flex items-center gap-4 transition-all duration-300 ${
            hovered ? "opacity-0 scale-75 absolute pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
          <span className={`${BASE_CLASSES} px-12 py-3.5 text-lg`}>Entrer</span>
        </div>

        <div
          className={`flex items-center gap-4 transition-all duration-300 ${
            hovered ? "opacity-100 scale-100" : "opacity-0 scale-75 absolute pointer-events-none"
          }`}
        >
          <button type="button" onClick={goToMembers} className={BASE_CLASSES}>
            Adhérent
          </button>
          <button
            type="button"
            onClick={() => setVisiteurOpen(true)}
            className={BASE_CLASSES}
          >
            Visiteur
          </button>
        </div>
      </div>

      <VisiteurDialog
        open={visiteurOpen}
        onOpenChange={setVisiteurOpen}
        onCta={goToElections}
      />
    </>
  );
};

export default EntryButton;
