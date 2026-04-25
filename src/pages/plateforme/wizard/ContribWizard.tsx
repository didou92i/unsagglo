import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contribSchema, type ContribFormData } from "../contribSchema";
import { useContribSubmit } from "@/hooks/useContribSubmit";
import { useCandidatSubmit } from "@/hooks/useCandidatSubmit";
import ContribSuccess from "../ContribSuccess";
import { FormError } from "@/components/forms";
import WizardProgress from "./WizardProgress";
import WizardNav from "./WizardNav";
import StepWelcome from "./StepWelcome";
import StepTheme from "./StepTheme";
import StepStory from "./StepStory";
import StepSolution from "./StepSolution";
import StepIdentity from "./StepIdentity";
import StepListe from "./StepListe";
import StepReview from "./StepReview";
import { STEP_ORDER, type WizardStepId, MAX_THEMES, THEME_VISUAL } from "./types";
import { CAMPAIGN_THEME_KEY } from "../campaign/types";

const composeContenu = (
  story: string,
  solution: string,
  themes: string[],
): string => {
  const cleanedStory = story.trim();
  const cleanedSolution = solution.trim();
  const themeLabels = themes
    .map((t) => THEME_VISUAL[t]?.short ?? t)
    .filter(Boolean);
  const header = themeLabels.length > 1 ? `Thèmes : ${themeLabels.join(", ")}\n\n` : "";
  if (cleanedSolution === "") {
    return `${header}Constat :\n${cleanedStory}`;
  }
  return `${header}Constat :\n${cleanedStory}\n\nProposition :\n${cleanedSolution}`;
};

const ContribWizard = (): JSX.Element => {
  const contrib = useContribSubmit();
  const candidat = useCandidatSubmit();

  const [stepIndex, setStepIndex] = useState<number>(0);
  const [themes, setThemes] = useState<string[]>([]);
  const [story, setStory] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  const [anonyme, setAnonyme] = useState<boolean>(false);
  const [willJoin, setWillJoin] = useState<boolean>(false);
  const [assistantOpen, setAssistantOpen] = useState<boolean>(false);
  const [stepError, setStepError] = useState<string | null>(null);

  // Pre-select the campaign theme when the agent landed via the campaign CTA
  // and jump them straight to the theme step so they see it highlighted.

  const {
    register,
    setValue,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<ContribFormData>({
    resolver: zodResolver(contribSchema),
    mode: "onChange",
    defaultValues: { rejoindreListe: false },
  });

  // Pre-select the campaign theme when the agent landed via the campaign CTA,
  // and jump them straight to the theme step so they see it highlighted.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const seed = sessionStorage.getItem(CAMPAIGN_THEME_KEY);
      if (!seed) return;
      sessionStorage.removeItem(CAMPAIGN_THEME_KEY);
      if (!THEME_VISUAL[seed]) return;
      setThemes([seed]);
      setValue("theme", seed, { shouldValidate: true });
      setStepIndex(STEP_ORDER.indexOf("theme"));
    } catch {
      // sessionStorage unavailable — silently skip.
    }
  }, [setValue]);

  const service = watch("service");
  const statut = watch("statut");
  const prenom = watch("prenom");

  const currentStep: WizardStepId = STEP_ORDER[stepIndex] ?? "welcome";
  const primaryTheme = themes[0];

  const toggleTheme = (theme: string): void => {
    setThemes((prev) => {
      if (prev.includes(theme)) {
        const next = prev.filter((t) => t !== theme);
        // Keep the form's primary `theme` field in sync for schema validation.
        setValue("theme", next[0] ?? "", { shouldValidate: true });
        return next;
      }
      if (prev.length >= MAX_THEMES) return prev;
      const next = [...prev, theme];
      setValue("theme", next[0] ?? "", { shouldValidate: true });
      return next;
    });
  };

  const onAnonymeChange = (v: boolean): void => {
    if (willJoin && v) return;
    setAnonyme(v);
  };

  const onWillJoinChange = (v: boolean): void => {
    setWillJoin(v);
    setValue("rejoindreListe", v, { shouldValidate: false });
    if (v) setAnonyme(false);
  };

  if (contrib.success) {
    return <ContribSuccess candidature={candidat.success} />;
  }

  const canContinue = ((): boolean => {
    switch (currentStep) {
      case "welcome":
        return true;
      case "theme":
        return themes.length >= 1;
      case "story":
        return story.trim().length >= 20;
      case "solution":
        return true;
      case "identity":
        return Boolean(service && statut && (anonyme || (prenom && prenom.length >= 2)));
      case "liste":
        return true;
      case "review":
        return true;
    }
  })();

  const handlePrevious = (): void => {
    setStepError(null);
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const handleNext = async (): Promise<void> => {
    setStepError(null);
    if (currentStep === "liste" && willJoin) {
      const ok = await trigger(["nom", "email", "telephone", "adresse", "prenom"]);
      if (!ok) {
        setStepError("Merci de compléter les informations pour rejoindre la liste.");
        return;
      }
    }
    setStepIndex((i) => Math.min(STEP_ORDER.length - 1, i + 1));
  };

  const handleSubmit = async (): Promise<void> => {
    setStepError(null);
    const data = getValues();

    if (themes.length === 0) {
      setStepError("Sélectionnez au moins une thématique.");
      setStepIndex(STEP_ORDER.indexOf("theme"));
      return;
    }
    if (story.trim().length < 20) {
      setStepError("Le constat est trop court (20 caractères minimum).");
      setStepIndex(STEP_ORDER.indexOf("story"));
      return;
    }
    if (!data.service || !data.statut) {
      setStepError("Service ou statut manquant.");
      return;
    }

    const contenu = composeContenu(story, solution, themes);
    const finalPrenom = anonyme ? "Anonyme" : (data.prenom ?? "Anonyme");

    await contrib.submit({
      prenom: finalPrenom,
      service: data.service,
      statut: data.statut,
      theme: themes[0]!,
      themes,
      contenu,
      anonyme,
    });

    if (willJoin && data.nom && data.email && data.telephone && data.adresse) {
      await candidat.submit({
        prenom: data.prenom ?? "",
        nom: data.nom,
        service: data.service,
        email: data.email,
        telephone: data.telephone,
        adresse: data.adresse,
      });
    }
  };

  const loading = contrib.loading || candidat.loading;

  return (
    <div
      className="rounded-lg border bg-white"
      style={{ borderColor: "#e6eaf0", padding: "32px" }}
    >
      <WizardProgress current={currentStep} />

      <div key={currentStep} className="animate-simulator-fade mt-8">
        {currentStep === "welcome" && <StepWelcome />}
        {currentStep === "theme" && (
          <StepTheme values={themes} onToggle={toggleTheme} />
        )}
        {currentStep === "story" && (
          <StepStory theme={primaryTheme} value={story} onChange={setStory} />
        )}
        {currentStep === "solution" && (
          <StepSolution
            theme={primaryTheme ?? ""}
            story={story}
            value={solution}
            onChange={setSolution}
            assistantOpen={assistantOpen}
            onAssistantOpenChange={setAssistantOpen}
          />
        )}
        {currentStep === "identity" && (
          <StepIdentity
            anonyme={anonyme}
            onAnonymeChange={onAnonymeChange}
            register={register}
            errors={errors}
            willJoinList={willJoin}
          />
        )}
        {currentStep === "liste" && (
          <StepListe
            willJoin={willJoin}
            onChange={onWillJoinChange}
            register={register}
            errors={errors}
          />
        )}
        {currentStep === "review" && (
          <StepReview
            themes={themes}
            story={story}
            solution={solution}
            anonyme={anonyme}
            prenom={prenom}
            service={service}
            statut={statut}
            willJoin={willJoin}
            onSubmit={() => void handleSubmit()}
            loading={loading}
          />
        )}
      </div>

      {(stepError || contrib.error || candidat.error) && (
        <div className="mt-6">
          <FormError message={stepError ?? contrib.error ?? candidat.error ?? ""} />
        </div>
      )}

      {currentStep !== "review" && (
        <WizardNav
          onPrevious={handlePrevious}
          onNext={() => void handleNext()}
          nextDisabled={!canContinue}
          showPrevious={stepIndex > 0}
          loading={loading}
        />
      )}
      {currentStep === "review" && stepIndex > 0 && (
        <div className="mt-6 flex justify-start">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={loading}
            className="text-secondary border border-secondary px-6 py-2.5 rounded-[6px] text-sm font-medium hover:bg-secondary hover:text-white transition-colors disabled:opacity-40"
          >
            ← Précédent
          </button>
        </div>
      )}
    </div>
  );
};

export default ContribWizard;
