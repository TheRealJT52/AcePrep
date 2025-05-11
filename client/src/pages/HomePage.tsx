import { Link } from "wouter";
import { Rocket, MessageSquareText, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeaturesSection from "@/components/sections/features-section";
import StatsSection from "@/components/sections/stats-section";
import TestimonialsSection from "@/components/sections/testimonials-section";

export default function HomePage() {
  return (
    <>
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero section */}
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Powered by advanced AI</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-primary glow-primary">Master AP Exams</span> with<br />
              Your Personal AI Tutor
            </h1>
            
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto mb-10">
              Get personalized help, practice tests, and instant feedback for your AP courses using our advanced AI tutor system.
            </p>
            
            <div className="flex justify-center mb-16">
              <Button asChild size="lg" className="gap-2 rounded-full shadow-lg shadow-primary/20 h-14 px-8 group">
                <Link href="/courses">
                  <Rocket className="h-5 w-5" />
                  Explore AP Courses
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            {/* Preview image */}
            <div className="relative mx-auto max-w-5xl rounded-xl overflow-hidden shadow-2xl shadow-primary/10 border border-neutral-200/20">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="AcePrep Interface" 
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <div className="bg-neutral-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturesSection />
        </div>
      </div>

      {/* Stats and Testimonials */}
      <StatsSection />
      <TestimonialsSection />
    </>
  );
}
