import React from 'react';

interface Testimonial {
  name: string;
  initial: string;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    initial: "J",
    review: "This platform has completely changed the way I travel. The user experience is seamless and I highly recommend it."
  },
  {
    name: "Jane Smith",
    initial: "J",
    review: "An incredible service that helps me navigate the city effortlessly. A must-have for daily commuters."
  },
  {
    name: "Jane Smith",
    initial: "J",
    review: "An incredible service that helps me navigate the city effortlessly. A must-have for daily commuters."
  },
  {
    name: "Jane Smith",
    initial: "J",
    review: "An incredible service that helps me navigate the city effortlessly. A must-have for daily commuters."
  },
  
];

const TestimonialsSection: React.FC = () => {
  
  

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-16">
        <h2 className="text-3xl font-bold text-center text-bleu-nuit mb-12">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-6 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              {/* Photo avec l'initiale */}
              <div className="w-16 h-16 rounded-full bg-bleu-nuit text-white flex items-center justify-center text-3xl font-bold">
                {testimonial.initial}
              </div>

              {/* Avis */}
              <div>
                <h4 className="text-lg font-semibold text-bleu-nuit">{testimonial.name}</h4>
                <p className="text-gray-600 mt-2 text-sm">{testimonial.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
