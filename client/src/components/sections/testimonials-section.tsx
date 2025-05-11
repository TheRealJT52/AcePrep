import { TestimonialCard } from "@/components/ui/testimonial-card";

export default function TestimonialsSection() {
  const testimonials = [
    {
      rating: 5,
      quote: "AP Scholar AI helped me understand complex historical connections that I was struggling with. My essay scores improved dramatically!",
      author: "Jamie R.",
      title: "AP U.S. History Student"
    },
    {
      rating: 5,
      quote: "The AI tutor explained the Progressive Era in a way my textbook never could. Now I can make connections between different time periods easily.",
      author: "Alex T.",
      title: "AP U.S. History Student"
    },
    {
      rating: 4.5,
      quote: "Being able to ask questions at any time has been a game-changer for my study routine. I got a 5 on my AP exam and I know AP Scholar AI played a big role.",
      author: "Taylor M.",
      title: "AP U.S. History Student"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              rating={testimonial.rating}
              quote={testimonial.quote}
              author={testimonial.author}
              title={testimonial.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
