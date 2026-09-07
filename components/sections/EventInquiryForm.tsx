"use client";

import { useState } from "react";
import { z } from "zod";
import { Send } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/FormField";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Zadejte prosím jméno."),
  company: z.string().optional(),
  type: z.string().min(1, "Vyberte typ akce."),
  guests: z.string().min(1, "Zadejte přibližný počet hostů."),
  date: z.string().min(1, "Zadejte termín."),
  email: z.string().email("Zadejte platný e-mail."),
  message: z.string().optional(),
});

type FormState = Record<keyof z.infer<typeof schema>, string>;

const initial: FormState = {
  name: "",
  company: "",
  type: "Narozeniny",
  guests: "",
  date: "",
  email: "",
  message: "",
};

export function EventInquiryForm() {
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [done, setDone] = useState(false);

  function update<K extends keyof FormState>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setDone(true);
  }

  if (done) {
    return (
      <FormSuccess
        title="Poptávka odeslána (demo)"
        text="Toto je ukázkový formulář bez napojení na e-mail či CRM. V ostrém provozu by teď na váš e-mail dorazilo potvrzení."
        onReset={() => {
          setValues(initial);
          setDone(false);
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-3xl border border-line bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Jméno a příjmení" error={errors.name}>
          <Input value={values.name} onChange={(e) => update("name", e.target.value)} placeholder="Jana Nováková" />
        </Field>
        <Field label="Firma (nepovinné)" error={errors.company}>
          <Input value={values.company} onChange={(e) => update("company", e.target.value)} placeholder="Manta s.r.o." />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Typ akce" error={errors.type}>
          <Select value={values.type} onChange={(e) => update("type", e.target.value)}>
            <option>Narozeniny</option>
            <option>Firemní večírek</option>
            <option>Teambuilding</option>
            <option>Svatba / raut</option>
            <option>Jiné</option>
          </Select>
        </Field>
        <Field label="Počet hostů" error={errors.guests}>
          <Input value={values.guests} onChange={(e) => update("guests", e.target.value)} placeholder="např. 25" />
        </Field>
        <Field label="Termín" error={errors.date}>
          <Input type="date" value={values.date} onChange={(e) => update("date", e.target.value)} />
        </Field>
      </div>
      <Field label="E-mail" error={errors.email}>
        <Input type="email" value={values.email} onChange={(e) => update("email", e.target.value)} placeholder="vas@email.cz" />
      </Field>
      <Field label="Zpráva (nepovinné)" error={errors.message}>
        <Textarea value={values.message} onChange={(e) => update("message", e.target.value)} placeholder="Řekněte nám víc o vaší představě akce…" />
      </Field>
      <Button type="submit" size="lg" className="justify-center">
        Poptat akci <Send className="size-4" />
      </Button>
    </form>
  );
}
