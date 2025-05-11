import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

interface CourseCardProps {
  title: string;
  imageUrl: string;
  description: string;
  status: "available" | "coming-soon";
  link: string;
}

export function CourseCard({
  title,
  imageUrl,
  description,
  status,
  link
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden border border-neutral-200 transition-transform hover:shadow-md hover:scale-[1.02]">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-heading font-medium text-neutral-500">{title}</h3>
          <Badge 
            variant={status === "available" ? "default" : "outline"}
            className={
              status === "available" 
                ? "bg-secondary text-white hover:bg-secondary-hover" 
                : "bg-accent text-neutral-500 hover:bg-accent-hover"
            }
          >
            {status === "available" ? "Available" : "Coming Soon"}
          </Badge>
        </div>
        <p className="text-neutral-400 mb-4">{description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        {status === "available" ? (
          <Link 
            href={link} 
            className="inline-flex items-center text-primary hover:text-primary-hover"
          >
            Start Learning
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        ) : (
          <span className="inline-flex items-center text-neutral-300 cursor-not-allowed">
            Coming Soon
            <span className="ml-1">⏱️</span>
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
