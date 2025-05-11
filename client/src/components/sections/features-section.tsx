import { Brain, BookOpen, Headset } from "lucide-react";
import { FeatureCard } from "@/components/ui/feature-card";

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "Smart Tutoring",
      description: "Our AI uses retrieval augmented generation (RAG) to provide accurate answers based on official College Board content."
    },
    {
      icon: BookOpen,
      title: "Aligned With CED",
      description: "All tutoring is based on the official Course and Exam Description (CED) from the College Board."
    },
    {
      icon: Headset,
      title: "24/7 Availability",
      description: "Get help whenever you need it, day or night, with instant responses to your questions."
    }
  ];

  return (
    <div className="mt-20">
      <h2 className="text-3xl font-heading font-medium text-center text-neutral-500 mb-12">
        How AP Scholar AI Helps You Succeed
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}
