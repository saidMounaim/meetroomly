import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">
          Welcome to Meetroomly
        </h1>
        <p className="text-xl mb-8 text-blue-700">
          Easily reserve meeting rooms for your team collaborations
        </p>
        <Button size="lg" asChild>
          <Link href="/rooms">Find a Room</Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
