import Navbar from "../navbar/Navbar";
import FAQSection from "./faq";
import Hero from "./hero/Hero";
import VideoCarousel from "./video-carousel/VideoCarousel";

const Home = () => {
  return (
    <div className="relative">
      <Navbar />
      <section id="hero">
        <Hero />
      </section>

      <div className="h-24 bg-linear-to-b from-white to-[#f6efd9]" />

      <section id="services">
        <VideoCarousel />
      </section>

      <div className="h-24 bg-linear-to-b from-[#f6efd9] to-white" />

      <section id="faq">
        <FAQSection />
      </section>
    </div>
  );
};

export default Home;
