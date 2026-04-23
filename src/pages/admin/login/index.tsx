import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { MetaTags } from "@/components/seo";
import { InputField, FormError } from "@/components/forms";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Minimum 6 caractères"),
});
type LoginFormData = z.infer<typeof loginSchema>;

const AdminLoginPage = (): JSX.Element => {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  if (!loading && user) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    setSubmitting(true);
    setError(null);
    try {
      await login(data.email, data.password);
      navigate("/admin");
    } catch (err) {
      setError(
        err instanceof Error
          ? "Email ou mot de passe incorrect."
          : "Erreur de connexion.",
      );
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <MetaTags
        title="Espace administrateur"
        description="Connexion administrateur UNSAgglo"
        noIndex
      />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-black text-secondary">UNSAgglo</h1>
          <p className="text-xs text-muted-foreground mt-1 tracking-wide">
            Roissy Pays de France
          </p>
        </div>

        <div
          className="rounded-lg border bg-white px-8 py-10"
          style={{ borderColor: "#e6eaf0" }}
        >
          <h2
            className="font-display font-medium text-secondary"
            style={{ fontSize: "20px" }}
          >
            Espace administrateur UNSAgglo
          </h2>
          <p className="text-muted-foreground mt-1" style={{ fontSize: "13px" }}>
            Connexion réservée aux membres du bureau
          </p>

          {error && (
            <div className="mt-6">
              <FormError message={error} />
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <InputField<LoginFormData>
              label="Email"
              name="email"
              register={register}
              error={errors.email}
              type="email"
            />
            <InputField<LoginFormData>
              label="Mot de passe"
              name="password"
              register={register}
              error={errors.password}
              type="password"
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full text-white text-sm font-medium rounded-[6px] px-6 py-3 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#009fe3" }}
            >
              {submitting ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <p
            className="mt-6 text-muted-foreground text-center leading-relaxed"
            style={{ fontSize: "12px" }}
          >
            Accès restreint. Pour une demande d'ajout de compte, contactez le
            Secrétaire Général.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
