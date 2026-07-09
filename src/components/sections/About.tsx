import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const Counter = ({ value, label }: { value: string, label: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 glass-card rounded-2xl hover:glow-blue transition-all duration-300">
      <span className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{value}</span>
      <span className="text-sm text-gray-400 uppercase tracking-wider">{label}</span>
    </div>
  );
};

export const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="about" ref={containerRef} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neonBlue to-neonPurple mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image & Glow */}
          <motion.div style={{ y: y1 }} className="relative group mx-auto w-full max-w-md">
            <div className="absolute -inset-4 bg-gradient-to-r from-neonBlue to-neonPurple rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative rounded-2xl overflow-hidden glass aspect-[4/5] border border-white/10 p-2">
              <div className="w-full h-full bg-black/50 rounded-xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Haseeb Ashfaq" 
                  className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div style={{ y: y2 }} className="space-y-8">
            <div className="prose prose-invert prose-lg text-gray-400">
              <p className="text-xl text-white font-medium mb-4">
                Hello! I'm a passionate Full Stack Developer with a knack for creating cinematic, high-performance web applications.
              </p>
              <p>
                My journey in web development started with a curiosity to build things that live on the internet. Fast forward to today, I've had the privilege of building software for startups, mid-sized companies, and ambitious entrepreneurs on Upwork.
              </p>
              <p>
                I specialize in crafting premium digital experiences using modern technologies like React, Next.js, and Three.js, ensuring that every project not only functions flawlessly but looks extraordinary.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8">
              <Counter value="3+" label="Years Exp." />
              <Counter value="50+" label="Projects" />
              <Counter value="100%" label="Satisfaction" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
