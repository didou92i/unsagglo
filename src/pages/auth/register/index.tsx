import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import PageWrapper from "@/components/layout/PageWrapper";
import { MetaTags } from "@/components/seo";
import { InputField, FormError } from "@/components/forms";
import UButton from "@/components/ui/UButton";

const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Minimum 8 caracteres"),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirm"],
});
type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = (): JSX.Element => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await registerUser(data.email, data.password);
      navigate("/members");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'inscription");
    }
    setLoading(false);
  };

  return (
    <PageWrapper>
      <MetaTags title="Inscription" description="Creer un compte UNSAgglo" noIndex />
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-8">
          <h1 className="font-display text-3xl font-black text-secondary text-center">Creer un compte</h1>
          <p className="text-muted-foreground text-center mb-6">Espace membres UNSAgglo</p>
          {error && <FormError message={error} />}
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField<RegisterFormData> label="Email" name="email" register={register} error={errors.email} type="email" />
            <InputField<RegisterFormData> label="Mot de passe" name="password" register={register} error={errors.password} type="password" />
            <InputField<RegisterFormData> label="Confirmer le mot de passe" name="confirm" register={register} error={errors.confirm} type="password" />
            <UButton type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-2">Creer mon compte</UButton>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Deja membre ? <Link to="/auth/login" className="text-primary font-semibold hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default RegisterPage;
