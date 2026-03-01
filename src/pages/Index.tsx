import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import InnovationSection from "@/components/InnovationSection";
import TechStackSection from "@/components/TechStackSection";
import VisionSection from "@/components/VisionSection";
import TimelineSection from "@/components/TimelineSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProductsSection />
      <InnovationSection />
      <TechStackSection />
      <VisionSection />
      <TimelineSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
