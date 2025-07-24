import { CourseCard } from "@/components/ui/course-card";
import { Filter, Search, GraduationCap, Crown, Globe, Flag, Leaf, LineChart, BarChart3, Landmark, Dna } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { PasswordDialog } from "@/components/ui/password-dialog";
import { useState } from "react";

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<{ name: string; link: string } | null>(null);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const getStatus = (courseCode: keyof typeof siteConfig.passwordProtection.courses) => {
    const courseConfig = siteConfig.passwordProtection.courses[courseCode];
    
    // Development status overrides everything
    if (courseConfig?.development) {
      return "development" as const;
    }
    
    if (courseConfig?.maintenance) {
      return "maintenance" as const;
    }
    
    // Currently available courses
    if (["APUSH", "APWH", "APEURO", "APBIO"].includes(courseCode)) {
      return "available" as const;
    }
    return "coming-soon" as const;
  };

  const handleDevelopmentClick = (courseName: string, link: string) => {
    setSelectedCourse({ name: courseName, link });
    setShowPasswordDialog(true);
  };

  const handlePasswordDialogSuccess = () => {
    if (selectedCourse) {
      // Navigate to the course page
      window.location.href = selectedCourse.link;
    }
  };

  const handlePasswordDialogClose = () => {
    setShowPasswordDialog(false);
    setSelectedCourse(null);
  };

  const courses = [
    {
      id: "apush",
      title: "AP U.S. History",
      icon: Flag,
      bgColor: "bg-primary",
      description: "Learn about US history from pre-colonial times to the present. Our AI tutor helps with concepts, historical thinking skills, and exam prep.",
      status: getStatus("APUSH"),
      link: "/apush-tutor"
    },
    {
      id: "apwh",
      title: "AP World History",
      icon: Globe,
      bgColor: "bg-secondary",
      description: "Explore key concepts in world history from 1200 CE to the present. Timeline, comparisons, and contextual connections.",
      status: getStatus("APWH"),
      link: "/apwh-tutor"
    },
    {
      id: "apeuro",
      title: "AP European History",
      icon: Crown,
      bgColor: "bg-accent",
      description: "Dive into European history from 1450 to the present. Cultural, intellectual, political, and diplomatic developments.",
      status: getStatus("APEURO"),
      link: "/apeuro-tutor"
    },
    {
      id: "apes",
      title: "AP Environmental Science",
      icon: Leaf,
      bgColor: "bg-green-600",
      description: "Explore environmental issues, renewable energy, pollution, and ecosystems. Prepare for the AP exam with our specialized AI tutor.",
      status: getStatus("APES"),
      link: "/apes-tutor"
    },
    {
      id: "apmacro",
      title: "AP Macroeconomics",
      icon: LineChart,
      bgColor: "bg-blue-600",
      description: "Master economic principles, fiscal and monetary policy, and economic indicators. Ideal for AP exam preparation.",
      status: getStatus("APMACRO"),
      link: "/apmacro-tutor"
    },
    {
      id: "apmicro",
      title: "AP Microeconomics",
      icon: BarChart3,
      bgColor: "bg-purple-600",
      description: "Study market structures, firm behavior, and consumer choice with our AI tutor. Perfect for mastering microeconomic concepts.",
      status: getStatus("APMICRO"),
      link: "/apmicro-tutor"
    },
    {
      id: "apgov",
      title: "AP Government & Politics",
      icon: Landmark,
      bgColor: "bg-red-600",
      description: "Understand the U.S. political system, constitutional foundations, and civil liberties with our comprehensive tutor.",
      status: getStatus("APGOV"),
      link: "/apgov-tutor"
    },
    {
      id: "apbio",
      title: "AP Biology",
      icon: Dna,
      bgColor: "bg-emerald-600",
      description: "Explore biological concepts from molecular to ecosystem levels. Master cell biology, genetics, evolution, and ecology.",
      status: getStatus("APBIO"),
      link: "/apbio-tutor"
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
              icon={course.icon}
              bgColor={course.bgColor}
              description={course.description}
              status={course.status}
              link={course.link}
              onClick={course.status === "development" ? () => handleDevelopmentClick(course.title, course.link) : undefined}
            />
          ))}
        </div>
        
        <PasswordDialog
          isOpen={showPasswordDialog}
          onClose={handlePasswordDialogClose}
          onSuccess={handlePasswordDialogSuccess}
          courseName={selectedCourse?.name || ""}
        />
      </div>
    </section>
  );
}
