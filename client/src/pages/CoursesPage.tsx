import { CourseCard } from "@/components/ui/course-card";
import { Filter, Search, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CoursesPage() {
  const courses = [
    {
      id: "apush",
      title: "AP U.S. History",
      image: "https://images.unsplash.com/photo-1551523713-c1fc7a8978ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      description: "Learn about US history from pre-colonial times to the present. Our AI tutor helps with concepts, historical thinking skills, and exam prep.",
      status: "available",
      link: "/apush-tutor"
    },
    {
      id: "apwh",
      title: "AP World History",
      image: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      description: "Explore key concepts in world history from 1200 CE to the present. Timeline, comparisons, and contextual connections.",
      status: "coming-soon",
      link: "#"
    },
    {
      id: "apeh",
      title: "AP European History",
      image: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      description: "Dive into European history from 1450 to the present. Cultural, intellectual, political, and diplomatic developments.",
      status: "coming-soon",
      link: "#"
    }
  ];

  return (
    <section className="py-16 relative">
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <GraduationCap className="text-primary h-6 w-6" />
          <h1 className="text-3xl font-bold text-center">
            <span className="text-primary glow-primary">AP Courses</span> Collection
          </h1>
        </div>
        
        <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-12">
          Browse our growing library of AP course tutors, each designed to help you master content, practice skills, and prepare for your exams.
        </p>
        
        {/* Search and filter controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
            <Input 
              placeholder="Search courses..." 
              className="pl-10 bg-neutral-200/20 border-neutral-200/30 focus-visible:ring-primary"
            />
          </div>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              imageUrl={course.image}
              description={course.description}
              status={course.status === "available" ? "available" : "coming-soon"}
              link={course.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
