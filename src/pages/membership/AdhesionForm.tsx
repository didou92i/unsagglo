import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import UButton from "@/components/ui/UButton";
import UInput from "@/components/ui/UInput";
import { Checkbox } from "@/components/ui/checkbox";
import { adhesionSchema, type AdhesionFormValues } from "./adhesionSchema";
import { SITES_CARPF } from "./sitesCARPF";
import { generateAdhesionBulletin } from "@/lib/pdf/generateAdhesionBulletin";
import { COTISATION_MENSUELLE } from "@/lib/orgInfo";

const AdhesionForm = (): JSX.Element => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AdhesionFormValues>({
    resolver: zodResolver(adhesionSchema),
    defaultValues: {
      mode_paiement: "virement",
    },
  });

  const rgpdConsent = watch("rgpd_consent");
  const statutsAcceptes = watch("statuts_acceptes");

  const onSubmit: SubmitHandler<AdhesionFormValues> = async (values) => {
    setSubmitting(true);
    const now = new Date().toISOString();

    const { error } = await supabase.from("adherents").insert({
      nom: values.nom,
      prenom: values.prenom,
      date_naissance: values.date_naissance,
      email: values.email,
      telephone: values.telephone,
      adresse_ligne1: values.adresse_ligne1,
      adresse_ligne2: values.adresse_ligne2 || null,
      adresse_cp: values.adresse_cp,
      adresse_ville: values.adresse_ville,
      categorie: values.categorie,
      grade: values.grade,
      echelon: values.echelon,
      statut_pro: values.statut_pro,
      service: values.service,
      site_affectation: values.site_affectation,
      date_entree_carpf: values.date_entree_carpf || null,
      mode_paiement: values.mode_paiement,
      periodicite_paiement: "mensuel",
      rgpd_consent_at: now,
      statuts_acceptes_at: now,
      statut: "pending_validation",
    });

    setSubmitting(false);

    if (error) {
      if (error.code === "23505") {
        toast.error(
          "Une demande d'adhésion existe déjà avec cette adresse e-mail.",
        );
      } else if (error.code === "23514") {
        toast.error(
          "Une valeur saisie n'est pas reconnue par le serveur. Vérifiez vos sélections (catégorie, statut, mode de paiement).",
        );
      } else if (error.code === "23502") {
        toast.error(
          "Un champ obligatoire est manquant. Vérifiez votre saisie.",
        );
      } else {
        toast.error("Erreur lors de la soumission. Merci de réessayer.");
      }
      return;
    }

    // Génération du bulletin PDF côté client
    const pdfBlob = generateAdhesionBulletin(values);
    const pdfUrl = URL.createObjectURL(pdfBlob);

    sessionStorage.setItem(
      "unsagglo:lastAdhesion",
      JSON.stringify({
        prenom: values.prenom,
        nom: values.nom,
        email: values.email,
        mode_paiement: values.mode_paiement,
        pdfUrl,
      }),
    );

    navigate("/membership/confirmation");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto space-y-10"
      noValidate
    >
      {/* Section 1 — Identité civile */}
      <fieldset className="space-y-4">
        <legend className="font-display text-lg font-bold text-foreground mb-2">
          1. Identité civile
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium mb-1">
              Prénom <span className="text-destructive">*</span>
            </label>
            <UInput
              id="prenom"
              {...register("prenom")}
              aria-invalid={!!errors.prenom}
            />
            {errors.prenom && (
              <p className="text-destructive text-xs mt-1">
                {errors.prenom.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="nom" className="block text-sm font-medium mb-1">
              Nom <span className="text-destructive">*</span>
            </label>
            <UInput
              id="nom"
              {...register("nom")}
              aria-invalid={!!errors.nom}
            />
            {errors.nom && (
              <p className="text-destructive text-xs mt-1">
                {errors.nom.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="date_naissance"
            className="block text-sm font-medium mb-1"
          >
            Date de naissance <span className="text-destructive">*</span>
          </label>
          <UInput
            id="date_naissance"
            type="date"
            {...register("date_naissance")}
            aria-invalid={!!errors.date_naissance}
          />
          {errors.date_naissance && (
            <p className="text-destructive text-xs mt-1">
              {errors.date_naissance.message}
            </p>
          )}
        </div>
      </fieldset>

      {/* Section 2 — Coordonnées */}
      <fieldset className="space-y-4">
        <legend className="font-display text-lg font-bold text-foreground mb-2">
          2. Coordonnées
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Adresse e-mail (préférablement personnelle){" "}
              <span className="text-destructive">*</span>
            </label>
            <UInput
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-destructive text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="telephone"
              className="block text-sm font-medium mb-1"
            >
              Téléphone <span className="text-destructive">*</span>
            </label>
            <UInput
              id="telephone"
              type="tel"
              autoComplete="tel"
              placeholder="06 12 34 56 78"
              {...register("telephone")}
              aria-invalid={!!errors.telephone}
            />
            {errors.telephone && (
              <p className="text-destructive text-xs mt-1">
                {errors.telephone.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="adresse_ligne1"
            className="block text-sm font-medium mb-1"
          >
            Adresse <span className="text-destructive">*</span>
          </label>
          <UInput
            id="adresse_ligne1"
            autoComplete="address-line1"
            {...register("adresse_ligne1")}
            aria-invalid={!!errors.adresse_ligne1}
          />
          {errors.adresse_ligne1 && (
            <p className="text-destructive text-xs mt-1">
              {errors.adresse_ligne1.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="adresse_ligne2"
            className="block text-sm font-medium mb-1"
          >
            Complément d'adresse{" "}
            <span className="text-muted-foreground">(facultatif)</span>
          </label>
          <UInput
            id="adresse_ligne2"
            autoComplete="address-line2"
            {...register("adresse_ligne2")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="adresse_cp"
              className="block text-sm font-medium mb-1"
            >
              Code postal <span className="text-destructive">*</span>
            </label>
            <UInput
              id="adresse_cp"
              autoComplete="postal-code"
              inputMode="numeric"
              maxLength={5}
              {...register("adresse_cp")}
              aria-invalid={!!errors.adresse_cp}
            />
            {errors.adresse_cp && (
              <p className="text-destructive text-xs mt-1">
                {errors.adresse_cp.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="adresse_ville"
              className="block text-sm font-medium mb-1"
            >
              Ville <span className="text-destructive">*</span>
            </label>
            <UInput
              id="adresse_ville"
              autoComplete="address-level2"
              {...register("adresse_ville")}
              aria-invalid={!!errors.adresse_ville}
            />
            {errors.adresse_ville && (
              <p className="text-destructive text-xs mt-1">
                {errors.adresse_ville.message}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Section 3 — Situation professionnelle */}
      <fieldset className="space-y-4">
        <legend className="font-display text-lg font-bold text-foreground mb-2">
          3. Situation professionnelle à la CARPF
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="categorie"
              className="block text-sm font-medium mb-1"
            >
              Catégorie statutaire <span className="text-destructive">*</span>
            </label>
            <select
              id="categorie"
              {...register("categorie")}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              aria-invalid={!!errors.categorie}
              defaultValue=""
            >
              <option value="" disabled>
                — Sélectionner —
              </option>
              <option value="A">Catégorie A</option>
              <option value="B">Catégorie B</option>
              <option value="C">Catégorie C</option>
            </select>
            {errors.categorie && (
              <p className="text-destructive text-xs mt-1">
                {errors.categorie.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="statut_pro"
              className="block text-sm font-medium mb-1"
            >
              Statut <span className="text-destructive">*</span>
            </label>
            <select
              id="statut_pro"
              {...register("statut_pro")}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              aria-invalid={!!errors.statut_pro}
              defaultValue=""
            >
              <option value="" disabled>
                — Sélectionner —
              </option>
              <option value="titulaire">Titulaire</option>
              <option value="stagiaire">Stagiaire</option>
              <option value="contractuel_cdi">Contractuel CDI</option>
              <option value="contractuel_cdd">Contractuel CDD</option>
              <option value="apprenti">Apprenti</option>
              <option value="retraite">Retraité de la CARPF</option>
            </select>
            {errors.statut_pro && (
              <p className="text-destructive text-xs mt-1">
                {errors.statut_pro.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="grade" className="block text-sm font-medium mb-1">
              Grade <span className="text-destructive">*</span>
            </label>
            <UInput
              id="grade"
              placeholder="Ex. Adjoint administratif principal de 2e classe"
              {...register("grade")}
              aria-invalid={!!errors.grade}
            />
            {errors.grade && (
              <p className="text-destructive text-xs mt-1">
                {errors.grade.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="echelon"
              className="block text-sm font-medium mb-1"
            >
              Échelon <span className="text-destructive">*</span>
            </label>
            <UInput
              id="echelon"
              type="number"
              min={1}
              max={20}
              {...register("echelon", { valueAsNumber: true })}
              aria-invalid={!!errors.echelon}
            />
            {errors.echelon && (
              <p className="text-destructive text-xs mt-1">
                {errors.echelon.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-1">
            Service ou direction <span className="text-destructive">*</span>
          </label>
          <UInput
            id="service"
            placeholder="Ex. Police municipale intercommunale, DRH, Petite enfance…"
            {...register("service")}
            aria-invalid={!!errors.service}
          />
          {errors.service && (
            <p className="text-destructive text-xs mt-1">
              {errors.service.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="site_affectation"
            className="block text-sm font-medium mb-1"
          >
            Site d'affectation <span className="text-destructive">*</span>
          </label>
          <input
            id="site_affectation"
            list="sites-carpf"
            type="text"
            placeholder="Ex. Roissy-en-France, Louvres…"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            {...register("site_affectation")}
            aria-invalid={!!errors.site_affectation}
          />
          <datalist id="sites-carpf">
            {SITES_CARPF.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
          {errors.site_affectation && (
            <p className="text-destructive text-xs mt-1">
              {errors.site_affectation.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            La liste propose les principales communes de la CARPF. Vous pouvez
            aussi saisir librement votre site précis.
          </p>
        </div>

        <div>
          <label
            htmlFor="date_entree_carpf"
            className="block text-sm font-medium mb-1"
          >
            Date d'entrée à la CARPF{" "}
            <span className="text-muted-foreground">(facultatif)</span>
          </label>
          <UInput
            id="date_entree_carpf"
            type="date"
            {...register("date_entree_carpf")}
          />
          {errors.date_entree_carpf && (
            <p className="text-destructive text-xs mt-1">
              {errors.date_entree_carpf.message}
            </p>
          )}
        </div>
      </fieldset>

      {/* Section 4 — Cotisation */}
      <fieldset className="space-y-4">
        <legend className="font-display text-lg font-bold text-foreground mb-2">
          4. Cotisation
        </legend>

        <div className="rounded-lg p-5" style={{ backgroundColor: "#eff9fe" }}>
          <p className="text-foreground">
            <strong className="text-2xl font-display">
              {COTISATION_MENSUELLE.toFixed(2).replace(".", ",")} € / mois
            </strong>
            <span className="text-sm text-muted-foreground ml-2">
              ({(COTISATION_MENSUELLE * 12).toFixed(2).replace(".", ",")} € /
              an)
            </span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Cotisation unique pour toutes les catégories, votée en assemblée
            générale. 66 % de votre cotisation est déductible de l'impôt sur le
            revenu (article 199 quater C du Code général des impôts).
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Mode de paiement souhaité <span className="text-destructive">*</span>
          </label>
          <div className="space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                value="virement"
                {...register("mode_paiement")}
                className="mt-1"
              />
              <span>
                <strong>Virement bancaire</strong>
                <span className="block text-xs text-muted-foreground">
                  Le RIB UNSAgglo vous sera transmis après validation de votre
                  demande.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                value="cheque"
                {...register("mode_paiement")}
                className="mt-1"
              />
              <span>
                <strong>Chèque</strong>
                <span className="block text-xs text-muted-foreground">
                  À l'ordre d'UNSAgglo, à envoyer à l'adresse postale après
                  validation.
                </span>
              </span>
            </label>
          </div>
          {errors.mode_paiement && (
            <p className="text-destructive text-xs mt-1">
              {errors.mode_paiement.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-3 italic">
            Le paiement en ligne par carte ou prélèvement SEPA sera disponible
            prochainement.
          </p>
        </div>
      </fieldset>

      {/* Section 5 — Engagement */}
      <fieldset className="space-y-4">
        <legend className="font-display text-lg font-bold text-foreground mb-2">
          5. Engagement
        </legend>

        <div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="statuts_acceptes"
              checked={statutsAcceptes}
              onCheckedChange={(c) =>
                setValue("statuts_acceptes", c === true, {
                  shouldValidate: true,
                })
              }
              className="mt-0.5"
            />
            <label
              htmlFor="statuts_acceptes"
              className="text-sm leading-relaxed cursor-pointer"
            >
              Je déclare adhérer librement à UNSAgglo et accepter sans réserve
              les{" "}
              <a
                href="mailto:unsagglo@roissypaysdefrance.fr?subject=Demande%20des%20statuts%20UNSAgglo"
                className="text-primary underline"
              >
                statuts d'UNSAgglo (disponibles sur demande)
              </a>
              . Une copie sera fournie par e-mail dès réception de votre
              bulletin signé.
            </label>
          </div>
          {errors.statuts_acceptes && (
            <p className="text-destructive text-xs mt-1 ml-7">
              {errors.statuts_acceptes.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="rgpd_consent"
              checked={rgpdConsent}
              onCheckedChange={(c) =>
                setValue("rgpd_consent", c === true, {
                  shouldValidate: true,
                })
              }
              className="mt-0.5"
            />
            <label
              htmlFor="rgpd_consent"
              className="text-sm leading-relaxed cursor-pointer"
            >
              J'autorise UNSAgglo à traiter mes données pour la gestion de mon
              adhésion, conformément à la{" "}
              <Link
                to="/politique-confidentialite"
                target="_blank"
                className="text-primary underline"
              >
                politique de confidentialité
              </Link>
              .
            </label>
          </div>
          {errors.rgpd_consent && (
            <p className="text-destructive text-xs mt-1 ml-7">
              {errors.rgpd_consent.message}
            </p>
          )}
        </div>
      </fieldset>

      <div className="pt-4">
        <UButton
          type="submit"
          variant="primary"
          size="lg"
          className="w-full md:w-auto"
          disabled={submitting}
        >
          {submitting ? "Envoi en cours…" : "Envoyer ma demande d'adhésion"}
        </UButton>
        <p className="text-xs text-muted-foreground mt-3">
          Votre demande sera examinée par le bureau d'UNSAgglo. Vous recevrez
          une confirmation par e-mail dans les meilleurs délais.
        </p>
      </div>
    </form>
  );
};

export default AdhesionForm;
