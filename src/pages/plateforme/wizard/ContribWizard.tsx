import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contribSchema, type ContribFormData } from "../contribSchema";
import { useContribSubmit } from "@/hooks/useContribSubmit";
import { useCandidatSubmit } from "@/hooks/useCandidatSubmit";
import { usePlatformStats } from "../usePlatformStats";
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
import { STEP_ORDER, type WizardStepId } from "./types";

const composeContenu = (story: string, solution: string): string => {
  const cleanedStory = story.trim();
  const cleanedSolution = solution.trim();
  if (cleanedSolution === "") {
    return `Constat :\n${cleanedStory}`;
  }
  return `Constat :\n${cleanedStory}\n\nProposition :\n${cleanedSolution}`;
};

const ContribWizard = (): JSX.Element => {
  const contrib = useContribSubmit();
  const candidat = useCandidatSubmit();
  const { stats } = usePlatformStats();

  const [stepIndex, setStepIndex] = useState<number>(0);
  const [story, setStory] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  const [anonyme, setAnonyme] = useState<boolean>(false);
  const [willJoin, setWillJoin] = useState<boolean>(false);
  const [assistantOpen, setAssistantOpen] = useState<boolean>(false);
  const [stepError, setStepError] = useState<string | null>(null);

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

  const theme = watch("theme");
  const service = watch("service");
  const statut = watch("statut");
  const prenom = watch("prenom");

  const currentStep: WizardStepId = STEP_ORDER[stepIndex] ?? "welcome";

  const onAnonymeChange = (v: boolean): void => {
    if (willJoin && v) return; // anon and listing are mutually exclusive
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
        return Boolean(theme);
      case "story":
        return story.trim().length >= 20;
      case "solution":
        return true; // optional step
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
      // Validate the listing fields (nom, email, telephone, adresse) before
      // letting the agent move on.
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

    if (story.trim().length < 20) {
      setStepError("Le constat est trop court (20 caractères minimum).");
      setStepIndex(STEP_ORDER.indexOf("story"));
      return;
    }
    if (!data.service || !data.statut || !data.theme) {
      setStepError("Service, statut ou thème manquant.");
      return;
    }

    const contenu = composeContenu(story, solution);
    const finalPrenom = anonyme ? "Anonyme" : (data.prenom ?? "Anonyme");

    await contrib.submit({
      prenom: finalPrenom,
      service: data.service,
      statut: data.statut,
      theme: data.theme,
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
        {currentStep === "welcome" && (
          <StepWelcome totalContributions={stats.contributions} />
        )}
        {currentStep === "theme" && (
          <StepTheme value={theme} onChange={(v) => setValue("theme", v, { shouldValidate: true })} />
        )}
        {currentStep === "story" && (
          <StepStory theme={theme} value={story} onChange={setStory} />
        )}
        {currentStep === "solution" && (
          <StepSolution
            theme={theme ?? ""}
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
            theme={theme}
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
