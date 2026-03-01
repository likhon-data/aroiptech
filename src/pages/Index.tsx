import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PartnersSection from "@/components/PartnersSection";
import ProductsSection from "@/components/ProductsSection";
import StatsSection from "@/components/StatsSection";
import InnovationSection from "@/components/InnovationSection";
import TechStackSection from "@/components/TechStackSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import VisionSection from "@/components/VisionSection";
import TimelineSection from "@/components/TimelineSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aroip",
  url: "https://aroip.com",
  logo: "https://aroip.com/favicon.png",
  description: "Premium eco-friendly AI hardware and sustainable smart devices.",
  foundingDate: "2025",
  sameAs: [
    "https://instagram.com/aroip",
    "https://x.com/aroip",
    "https://linkedin.com/company/aroip",
    "https://youtube.com/@aroip",
  ],
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO jsonLd={jsonLd} />
      <Navbar />
      <HeroSection />
      <PartnersSection />
      <ProductsSection />
      <StatsSection />
      <InnovationSection />
      <TechStackSection />
      <TestimonialsSection />
      <VisionSection />
      <TimelineSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
