import { Card, CardContent } from "@/components/ui/card";
import { Star, StarHalf, User } from "lucide-react";

interface TestimonialCardProps {
  rating: number;
  quote: string;
  author: string;
  title: string;
}

export function TestimonialCard({
  rating,
  quote,
  author,
  title
}: TestimonialCardProps) {
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-accent text-accent" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-accent text-accent" />);
    }
    
    return stars;
  };

  return (
    <Card className="p-6 rounded-lg shadow-sm border border-neutral-200">
      <CardContent className="p-0">
        <div className="flex items-center mb-4">
          <div className="flex text-accent">
            {renderStars()}
          </div>
        </div>
        <p className="text-neutral-400 mb-4">{quote}</p>
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-neutral-300 flex items-center justify-center mr-3">
            <User className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="font-heading font-medium text-neutral-500">{author}</p>
            <p className="text-sm text-neutral-400">{title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
