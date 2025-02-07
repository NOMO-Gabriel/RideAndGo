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
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-bleu-nuit mb-8 sm:mb-12">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-bleu-nuit text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shrink-0">
                {testimonial.initial}
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-semibold text-bleu-nuit">{testimonial.name}</h4>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">{testimonial.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
