import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contribSchema, type ContribFormData } from "./contribSchema";
import type { ContribHook, CandidatHook } from "@/types/contrib";

export interface UseContribFormReturn {
  anonyme: boolean;
  rejoindreListe: boolean;
  assistantOpen: boolean;
  setAssistantOpen: (v: boolean) => void;
  onAnonymeChange: (checked: boolean) => void;
  onCheckedChange: (checked: boolean) => void;
  handleUseProposal: (text: string) => void;
  loading: boolean;
  error: string | null;
  currentTheme: string;
  register: ReturnType<typeof useForm<ContribFormData>>["register"];
  handleSubmit: ReturnType<typeof useForm<ContribFormData>>["handleSubmit"];
  errors: ReturnType<typeof useForm<ContribFormData>>["formState"]["errors"];
  onSubmit: (data: ContribFormData) => Promise<void>;
}

export function useContribForm(
  contrib: ContribHook,
  candidat: CandidatHook,
): UseContribFormReturn {
  const [anonyme, setAnonyme] = useState<boolean>(false);
  const [rejoindreListe, setRejoindreListe] = useState<boolean>(false);
  const [assistantOpen, setAssistantOpen] = useState<boolean>(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ContribFormData>({
    resolver: zodResolver(contribSchema),
  });

  const currentTheme = watch("theme") ?? "";

  const onAnonymeChange = (checked: boolean): void => {
    setAnonyme(checked);
    if (checked) {
      setRejoindreListe(false);
      setValue("rejoindreListe", false);
    }
  };

  const onCheckedChange = (checked: boolean): void => {
    setRejoindreListe(checked);
    setValue("rejoindreListe", checked);
    if (checked) setAnonyme(false);
  };

  const onSubmit = async (data: ContribFormData): Promise<void> => {
    const prenom = anonyme ? "Anonyme" : (data.prenom ?? "Anonyme");
    await contrib.submit({ prenom, service: data.service, statut: data.statut, theme: data.theme, contenu: data.contenu, anonyme });
    if (rejoindreListe && data.nom && data.email && data.telephone && data.adresse) {
      await candidat.submit({
        prenom: data.prenom ?? "", nom: data.nom, service: data.service,
        email: data.email, telephone: data.telephone, adresse: data.adresse,
      });
    }
  };

  const handleUseProposal = (text: string): void => {
    setValue("contenu", text);
  };

  return {
    anonyme, rejoindreListe, assistantOpen, setAssistantOpen,
    onAnonymeChange, onCheckedChange, handleUseProposal,
    loading: contrib.loading || candidat.loading,
    error: contrib.error || candidat.error,
    currentTheme, register, handleSubmit, errors, onSubmit,
  };
}
