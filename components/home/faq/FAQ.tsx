"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="w-full max-w-xl px-[5%] md:px-0">
      <h2 className="text-3xl md:text-4xl font-semibold mb-2">FAQ</h2>
      <p className="text-gray-500 mb-8">Frequently Asked Questions</p>

      <Accordion type="single" collapsible className="space-y-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>What projects do you handle?</AccordionTrigger>
          <AccordionContent>
            We craft luxury video edits for brands, creators, and visionaries,
            from social media clips to cinematic promos.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>What sets Elite One apart?</AccordionTrigger>
          <AccordionContent>
            Every edit is cinematic, premium, and tailored to elevate your
            brand’s image.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>How do revisions work?</AccordionTrigger>
          <AccordionContent>
            We include revisions to ensure the final video matches your vision
            perfectly.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>What is the turnaround time?</AccordionTrigger>
          <AccordionContent>
            Short edits: 3–5 days <br />
            Cinematic projects: 10–14 days
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>How do I get started?</AccordionTrigger>
          <AccordionContent>
            Select a style from our Style Carousel or choose Custom, then fill
            out the form to begin your project.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
