import HeroSection from '../components/landing/HeroSection.jsx';
import CompanyMarquee from '../components/landing/CompanyMarquee.jsx';
import HowItWorks from '../components/landing/HowItWorks.jsx';
import WhyVaaniAuth from '../components/landing/WhyVaaniAuth.jsx';
import APIPreview from '../components/landing/APIPreview.jsx';
import PricingSection from '../components/landing/PricingSection.jsx';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-vaani-bg">
      <Navbar />
      <main>
        <HeroSection />
        <CompanyMarquee />
        <HowItWorks />
        <WhyVaaniAuth />
        <APIPreview />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
