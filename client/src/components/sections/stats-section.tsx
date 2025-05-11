import { StatCard } from "@/components/ui/stat-card";

export default function StatsSection() {
  const stats = [
    { value: "94%", label: "students report improved understanding" },
    { value: "87%", label: "see increased test scores" },
    { value: "24/7", label: "support when you need it" },
    { value: "1,000+", label: "historical topics covered" }
  ];

  return (
    <section className="py-12 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-heading font-medium text-center text-neutral-500 mb-12">
          Why Students Love AP Scholar AI
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
