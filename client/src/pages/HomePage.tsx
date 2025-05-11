import { Link } from "wouter";
import { School, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeaturesSection from "@/components/sections/features-section";
import StatsSection from "@/components/sections/stats-section";
import TestimonialsSection from "@/components/sections/testimonials-section";

export default function HomePage() {
  return (
    <>
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero section */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-500 mb-4">
              Your Personal AI Tutor for AP Classes
            </h1>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto mb-8">
              Get personalized help, practice tests, and instant feedback for your AP courses using our advanced AI tutor.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/courses">
                  <School className="h-5 w-5" />
                  Explore Courses
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary-light hover:text-primary gap-2">
                <Link href="/apush-tutor">
                  <MessageSquareText className="h-5 w-5" />
                  Try APUSH Tutor Now
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Features section */}
          <FeaturesSection />
        </div>
      </section>

      {/* Stats and Testimonials */}
      <StatsSection />
      <TestimonialsSection />
    </>
  );
}
