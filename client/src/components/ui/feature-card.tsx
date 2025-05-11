import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="p-6 rounded-lg shadow-sm border border-neutral-200">
      <CardContent className="p-0 text-center">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-light text-primary mb-4 mx-auto">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-heading font-medium text-neutral-500 text-center mb-2">
          {title}
        </h3>
        <p className="text-neutral-400 text-center">{description}</p>
      </CardContent>
    </Card>
  );
}
