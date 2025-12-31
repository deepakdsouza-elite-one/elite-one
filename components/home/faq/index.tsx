import FAQ from "./FAQ";
import LeadForm from "./LeadForm";

const FAQSection = () => {
  return (
    <div className="w-full h-[80svh] flex flex-col md:flex-row items-center justify-evenly pt-24 md:pt-0 gap-10 md:gap-0">
      <FAQ />
      <LeadForm />
    </div>
  );
};

export default FAQSection;
