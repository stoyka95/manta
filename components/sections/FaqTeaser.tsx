import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { faqShort } from "@/lib/content";

export function FaqTeaser() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading
          align="center"
          eyebrow="Časté dotazy"
          title="Odpovědi, ať víte, do čeho jdete."
        />
        <div className="mt-10">
          <Accordion items={faqShort} />
        </div>
        <Reveal className="mt-8 text-center">
          <Button href="/faq" variant="outline">
            Zobrazit všechny dotazy
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
