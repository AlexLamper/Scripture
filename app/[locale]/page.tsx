import React from 'react';
import { useIntl } from 'react-intl';
import GuestHero from '@/components/guest/GuestHero';
import Features from '@/components/guest/Features';
import CTA from '@/components/guest/CTA';
import Pricing17 from '@/components/guest/Pricing';
import Contact24 from '@/components/guest/Contact';
import Footer from '@/components/common/Footer';

const Index = () => {
  const { formatMessage } = useIntl();

  // Get translated text
  const heroTitle = formatMessage({ id: 'hero_title' });
  const heroDescription = formatMessage({ id: 'hero_description' });
  const startButtonText = formatMessage({ id: 'start_button' });

  return (
    <div className="min-h-[100vh]">
      <div className="lg:max-w-[80%] md:max-w-[80%] max-w-[85%] mx-auto">
        <GuestHero
          title={heroTitle} // Pass translated title
          description={heroDescription} // Pass translated description
          startButtonText={startButtonText} // Pass translated start button text
        />
        <Features />
        <CTA />
        <Pricing17 />
        <Contact24 />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
