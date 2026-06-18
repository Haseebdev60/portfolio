import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CEO at TechFlow",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    text: "Haseeb delivered a phenomenal SaaS dashboard that completely transformed how our users interact with our data. His attention to UI/UX and smooth animations is unmatched.",
    rating: 5
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Founder, Zenith E-commerce",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    text: "Working with Haseeb was a breeze. He took our outdated e-commerce site and turned it into a lightning-fast, premium experience. Our sales went up by 45% in the first month.",
    rating: 5
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Director of Marketing, Lumina",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    text: "The portfolio website he built for our agency is simply breathtaking. The 3D elements and smooth scroll make it stand out from anything else in our industry. Highly recommended!",
    rating: 5
  }
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden flex items-center justify-center min-h-[80vh]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neonPurple/10 via-background to-background pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 w-full text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-16">
          Client <span className="text-gradient">Success Stories</span>
        </h2>

        <div className="relative h-[400px] sm:h-[300px] w-full max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -50, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="glass-card rounded-3xl p-8 md:p-12 relative h-full flex flex-col items-center justify-center">
                <Quote className="absolute top-6 left-6 w-12 h-12 text-white/10" />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-xl md:text-2xl text-white font-medium mb-8 leading-relaxed font-display">
                  "{testimonials[currentIndex].text}"
                </p>

                <div className="flex items-center gap-4">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].name}
                    className="w-14 h-14 rounded-full border-2 border-neonBlue object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-white">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm text-gray-400">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'w-8 bg-neonBlue' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
