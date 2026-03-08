import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface SondageFormData {
  question: string;
  theme: string;
  actif: boolean;
  options: string[];
}

interface SondageFormProps {
  initial?: SondageFormData;
  onSubmit: (data: SondageFormData) => Promise<void>;
  onCancel: () => void;
}

const THEMES = [
  { value: "remuneration", label: "Remuneration" },
  { value: "conditions_travail", label: "Conditions de travail" },
  { value: "carriere", label: "Carriere" },
  { value: "rps", label: "Risques psychosociaux" },
  { value: "autre", label: "Autre" },
];

const DEFAULT: SondageFormData = {
  question: "",
  theme: "autre",
  actif: true,
  options: ["", ""],
};

const SondageForm = ({
  initial,
  onSubmit,
  onCancel,
}: SondageFormProps): JSX.Element => {
  const [data, setData] = useState<SondageFormData>(initial ?? DEFAULT);
  const [submitting, setSubmitting] = useState(false);

  const setField = <K extends keyof SondageFormData>(
    key: K,
    val: SondageFormData[K]
  ): void => setData((prev) => ({ ...prev, [key]: val }));

  const setOption = (idx: number, val: string): void => {
    const next = [...data.options];
    next[idx] = val;
    setField("options", next);
  };

  const addOption = (): void => setField("options", [...data.options, ""]);

  const removeOption = (idx: number): void =>
    setField("options", data.options.filter((_, i) => i !== idx));

  const valid =
    data.question.trim().length > 0 &&
    data.options.filter((o) => o.trim()).length >= 2;

  const handleSubmit = async (): Promise<void> => {
    if (!valid) return;
    setSubmitting(true);
    await onSubmit({
      ...data,
      options: data.options.filter((o) => o.trim()),
    });
    setSubmitting(false);
  };

  return (
    <div className="space-y-4 rounded-lg border border-border p-4">
      <div>
        <Label>Question</Label>
        <Textarea
          value={data.question}
          onChange={(e) => setField("question", e.target.value)}
          placeholder="Quelle est votre question ?"
        />
      </div>

      <div>
        <Label>Theme</Label>
        <select
          value={data.theme}
          onChange={(e) => setField("theme", e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {THEMES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          checked={data.actif}
          onCheckedChange={(v) => setField("actif", v)}
        />
        <Label>Actif</Label>
      </div>

      <div className="space-y-2">
        <Label>Options de reponse (min. 2)</Label>
        {data.options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              value={opt}
              onChange={(e) => setOption(i, e.target.value)}
              placeholder={`Option ${i + 1}`}
            />
            {data.options.length > 2 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeOption(i)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        {data.options.length < 6 && (
          <Button variant="outline" size="sm" onClick={addOption}>
            <Plus className="mr-1 h-4 w-4" /> Ajouter une option
          </Button>
        )}
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={handleSubmit} disabled={!valid || submitting}>
          {initial ? "Modifier" : "Creer"}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </div>
  );
};

export default SondageForm;
