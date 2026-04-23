import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "./faqData";

const Faq = (): JSX.Element => (
  <section className="px-4 md:px-6 py-20" style={{ backgroundColor: "#f5f5f7" }}>
    <div className="max-w-3xl mx-auto">
      <h2 className="text-secondary font-display font-medium text-3xl md:text-4xl text-center mb-10">
        Questions fréquentes
      </h2>
      <Accordion
        type="single"
        collapsible
        className="bg-white rounded-lg px-6 md:px-8"
      >
        {FAQ_ITEMS.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left text-secondary font-medium text-base hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-foreground/80 leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default Faq;
