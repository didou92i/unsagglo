import { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import UButton from "@/components/ui/UButton";
import UCard from "@/components/ui/UCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/ui/Spinner";

const ProfileCard = (): JSX.Element => {
  const { profile, loading, saving, save } = useProfile();
  const [nom, setNom] = useState<string>("");
  const [prenom, setPrenom] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [telephone, setTelephone] = useState<string>("");

  useEffect(() => {
    if (profile) {
      setNom(profile.nom);
      setPrenom(profile.prenom);
      setService(profile.service ?? "");
      setGrade(profile.grade ?? "");
      setTelephone(profile.telephone ?? "");
    }
  }, [profile]);

  if (loading) return <Spinner />;

  const handleSave = (): void => {
    save({
      nom,
      prenom,
      service: service || null,
      grade: grade || null,
      telephone: telephone || null,
    });
  };

  return (
    <UCard>
      <h3 className="font-display text-lg font-bold text-foreground mb-4">Mon profil</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Nom</Label>
          <Input value={nom} onChange={(e) => setNom(e.target.value)} />
        </div>
        <div>
          <Label>Prenom</Label>
          <Input value={prenom} onChange={(e) => setPrenom(e.target.value)} />
        </div>
        <div>
          <Label>Service</Label>
          <Input value={service} onChange={(e) => setService(e.target.value)} />
        </div>
        <div>
          <Label>Grade</Label>
          <Input value={grade} onChange={(e) => setGrade(e.target.value)} />
        </div>
        <div>
          <Label>Telephone</Label>
          <Input value={telephone} onChange={(e) => setTelephone(e.target.value)} type="tel" />
        </div>
      </div>
      <UButton variant="primary" size="sm" onClick={handleSave} loading={saving} className="mt-4">
        Enregistrer
      </UButton>
    </UCard>
  );
};

export default ProfileCard;
