import React from "react";
import HeroSection from "./sections/HeroSection";
import WhyUsSection from "./sections/WhyUsSection";

const LandingPage = () => {
  return (
    <main className="flex-grow">
      <HeroSection />
      <WhyUsSection />
    </main>
  );
};

export default LandingPage;
