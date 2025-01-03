import React from "react";
import AboutHero from "@/components/about/AboutHero";
import AboutFeatures from "@/components/about/AboutFeatures";
import AboutSection2 from "@/components/about/AboutSection2";
import AboutSection3 from "@/components/about/AboutSection3";

const AboutPage = () => {
  return (
    <div>
      <AboutHero />
      <AboutFeatures />
      <AboutSection3 />
      <AboutSection2 />
    </div>
  );
};

export default AboutPage;
