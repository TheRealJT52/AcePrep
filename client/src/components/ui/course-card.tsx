import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, CalendarClock, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  title: string;
  icon: LucideIcon;
  bgColor: string;
  description: string;
  status: "available" | "coming-soon";
  link?: string;
}

export function CourseCard({
  title,
  icon: Icon,
  bgColor,
  description,
  status,
  link = "#"
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden border border-neutral-200/30 bg-neutral-100/50 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 group">
      <div className="relative overflow-hidden">
        <div className={`p-6 flex flex-col items-center justify-center ${bgColor} h-48`}>
          <Icon className="h-16 w-16 text-white mb-4" />
          <h3 className="text-xl font-heading font-bold text-white text-center">{title}</h3>
        </div>
        <Badge 
          variant={status === "available" ? "default" : "outline"}
          className={`absolute top-3 right-3 z-20 ${
            status === "available" 
              ? "bg-secondary text-white hover:bg-secondary-hover" 
              : "bg-accent/80 backdrop-blur-sm text-black hover:bg-accent"
          }`}
        >
          {status === "available" ? (
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              <span>Available</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <CalendarClock className="h-3 w-3" />
              <span>Coming Soon</span>
            </div>
          )}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <p className="text-neutral-400 mb-4">{description}</p>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        {status === "available" ? (
          <Button 
            asChild 
            variant="secondary" 
            size="sm" 
            className="w-full gap-1 group-hover:bg-primary group-hover:text-white transition-colors"
          >
            <Link href={link}>
              Start Learning
              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        ) : (
          <Button 
            disabled 
            variant="outline" 
            size="sm" 
            className="w-full cursor-not-allowed opacity-70"
          >
            <CalendarClock className="h-4 w-4 mr-2" />
            Coming Soon
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
