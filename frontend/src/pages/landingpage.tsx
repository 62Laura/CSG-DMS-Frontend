import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPublicStats } from "@/lib/api";
import { useEffect } from "react";

// Import landing page components
import Navbar from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";

import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTASection } from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  const { data: publicStats } = useQuery({
    queryKey: ['publicStats'],
    queryFn: getPublicStats,
  });

  useEffect(() => {
    // Set page title
    document.title = "Community Savings Groups - Digital Management System";

    // Add meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Digitalize your Community Savings Group management with transparent record-keeping, automated calculations, and enhanced member trust. Built for Rwanda's community financial practices.");
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = "Digitalize your Community Savings Group management with transparent record-keeping, automated calculations, and enhanced member trust. Built for Rwanda's community financial practices.";
      document.head.appendChild(meta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", "Community Savings Groups, CSG, Rwanda, digital management, financial transparency, savings groups");
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = "Community Savings Groups, CSG, Rwanda, digital management, financial transparency, savings groups";
      document.head.appendChild(meta);
    }

    // Add structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Community Savings Groups Digital Management System",
      "description": "Digital management system for Community Savings Groups in Rwanda",
      "url": window.location.origin,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "RWF"
      },
      "publisher": {
        "@type": "Organization",
        "name": "CSG Digital Management System"
      }
    });
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(script);
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <section id="home" className="pt-24 pb-20 md:pt-32 md:pb-28">
          <HeroSection onGetStarted={handleGetStarted} />
        </section>
        {/* Features Section */}
        <section id="features" className="py-12 md:py-20 bg-secondary/5">
          <FeaturesSection />
        </section>
        {/* FAQ Section */}
        <section id="faq" className="py-12 md:py-20 bg-secondary/5">
          <FAQ />
        </section>
        {/* CTA Section */}
        <section className="py-12 md:py-20">
          <CTASection />
        </section>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
