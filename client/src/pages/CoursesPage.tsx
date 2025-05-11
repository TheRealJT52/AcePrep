import { CourseCard } from "@/components/ui/course-card";

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
      image: "https://pixabay.com/get/g368089e4683fabece375eb7280dd1116f82ee8ef364f76f31498d8b61796cad410dca9a395527677c9c55f71f125377b78ad9f5caea1bd7ca5727a80d9be46cd_1280.jpg",
      description: "Explore key concepts in world history from 1200 CE to the present. Timeline, comparisons, and contextual connections.",
      status: "coming-soon",
      link: "#"
    },
    {
      id: "apeh",
      title: "AP European History",
      image: "https://pixabay.com/get/g7b98024ebed1a33acc340d26c2360d8b9c131a7f572f935e4042de609e35b0df7878751b5cdd1263f0d05185b9bb7ef9fe0bda3d1193621260248d8d652840ac_1280.jpg",
      description: "Dive into European history from 1450 to the present. Cultural, intellectual, political, and diplomatic developments.",
      status: "coming-soon",
      link: "#"
    }
  ];

  return (
    <section className="py-12 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-medium text-center text-neutral-500 mb-12">
          Available AP Courses
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              imageUrl={course.image}
              description={course.description}
              status={course.status}
              link={course.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
