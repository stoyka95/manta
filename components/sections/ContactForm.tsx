"use client";

import { useState } from "react";
import { z } from "zod";
import { Send } from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/FormField";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Zadejte prosím jméno."),
  email: z.string().email("Zadejte platný e-mail."),
  message: z.string().min(5, "Napište nám prosím pár slov."),
});

type FormState = z.infer<typeof schema>;

const initial: FormState = { name: "", email: "", message: "" };

export function ContactForm() {
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
        title="Zpráva odeslána (demo)"
        text="Díky za zprávu! Toto je ukázkový formulář bez napojení na e-mail — v ostrém provozu bychom odpověděli do 24 hodin."
        onReset={() => {
          setValues(initial);
          setDone(false);
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-3xl border border-line bg-white p-6 sm:p-8">
      <Field label="Jméno a příjmení" error={errors.name}>
        <Input value={values.name} onChange={(e) => update("name", e.target.value)} placeholder="Jana Nováková" />
      </Field>
      <Field label="E-mail" error={errors.email}>
        <Input type="email" value={values.email} onChange={(e) => update("email", e.target.value)} placeholder="vas@email.cz" />
      </Field>
      <Field label="Zpráva" error={errors.message}>
        <Textarea value={values.message} onChange={(e) => update("message", e.target.value)} placeholder="Napište nám, s čím pomoct…" />
      </Field>
      <Button type="submit" size="lg" className="justify-center">
        Odeslat zprávu <Send className="size-4" />
      </Button>
    </form>
  );
}
