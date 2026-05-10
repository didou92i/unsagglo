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

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Minimum 6 caracteres"),
});
type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = (): JSX.Element => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await login(data.email, data.password);
      navigate("/members");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion");
    }
    setLoading(false);
  };

  return (
    <PageWrapper>
      <MetaTags title="Connexion" description="Espace membres UNSAgglo" noIndex />
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] p-8">
          <h1 className="font-display text-3xl font-black text-secondary text-center">UNSAgglo</h1>
          <p className="text-muted-foreground text-center mb-6">Espace membres</p>
          {error && <FormError message={error} />}
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField<LoginFormData> label="Email" name="email" register={register} error={errors.email} type="email" />
            <InputField<LoginFormData> label="Mot de passe" name="password" register={register} error={errors.password} type="password" />
            <UButton type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-2">Se connecter</UButton>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Pas encore membre ? <Link to="/adhesion" className="text-primary font-semibold hover:underline">Adherer</Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
