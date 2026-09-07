import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MantaMark } from "@/components/illustrations/MantaMark";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-32">
      <Container className="flex max-w-xl flex-col items-center text-center">
        <MantaMark className="h-24 w-auto opacity-80" />
        <p className="mt-6 font-display text-sm font-bold uppercase tracking-wide text-ocean-600">
          Chyba 404
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink-900 sm:text-4xl">
          Tahle dráha tu není.
        </h1>
        <p className="mt-4 text-ink-500">
          Stránka, kterou hledáte, neexistuje nebo byla přesunuta. Zkuste se
          vrátit na hlavní stránku.
        </p>
        <Button href="/" size="lg" className="mt-8">
          Zpět na domů
        </Button>
      </Container>
    </section>
  );
}
