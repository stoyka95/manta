"use client";

import { useState } from "react";
import { z } from "zod";
import { CalendarCheck } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/FormField";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Zadejte prosím jméno."),
  phone: z.string().min(9, "Zadejte platné telefonní číslo."),
  date: z.string().min(1, "Vyberte datum."),
  time: z.string().min(1, "Vyberte čas."),
  lanes: z.string().min(1),
  players: z.string().min(1, "Zadejte počet hráčů."),
  note: z.string().optional(),
});

type FormState = Record<keyof z.infer<typeof schema>, string>;

const initial: FormState = {
  name: "",
  phone: "",
  date: "",
  time: "18:00",
  lanes: "1",
  players: "",
  note: "",
};

export function ReservationForm() {
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
        title="Rezervace odeslána (demo)"
        text={`Termín ${values.date} v ${values.time} pro ${values.players} hráčů jsme si „zapsali“. Toto je ukázkový formulář bez napojení na rezervační systém — nic se neodeslalo.`}
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
        <Field label="Telefon" error={errors.phone}>
          <Input value={values.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+420 777 123 456" />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Datum" error={errors.date}>
          <Input type="date" value={values.date} onChange={(e) => update("date", e.target.value)} />
        </Field>
        <Field label="Čas" error={errors.time}>
          <Input type="time" value={values.time} onChange={(e) => update("time", e.target.value)} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Počet drah" error={errors.lanes}>
          <Select value={values.lanes} onChange={(e) => update("lanes", e.target.value)}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "dráha" : n < 5 ? "dráhy" : "drah"}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Počet hráčů" error={errors.players}>
          <Input value={values.players} onChange={(e) => update("players", e.target.value)} placeholder="např. 4" />
        </Field>
      </div>
      <Field label="Poznámka (nepovinné)" error={errors.note}>
        <Textarea value={values.note} onChange={(e) => update("note", e.target.value)} placeholder="Narozeninová oslava, potřebujeme boty vel. 38 a 41…" />
      </Field>
      <Button type="submit" size="lg" className="justify-center">
        Odeslat rezervaci <CalendarCheck className="size-4" />
      </Button>
    </form>
  );
}
