import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ParticlesBackground } from '../3d/ParticlesBackground';

const SplitText = ({ text }: { text: string }) => {
  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </span>
  );
};

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticlesBackground />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background z-10 pointer-events-none" />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-neonBlue/30 text-neonBlue text-sm font-medium"
        >
          <span className="w-2 h-2 rounded-full bg-neonBlue animate-pulse" />
          Available for new opportunities
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-4 text-white">
          <SplitText text="Haseeb" /> <span className="text-gradient"><SplitText text="Ashfaq" /></span>
        </h1>
        
        <h2 className="text-2xl md:text-4xl font-display text-gray-400 mb-8 font-medium">
          <SplitText text="Full Stack Web Developer" />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 font-sans"
        >
          I build modern, scalable and visually stunning web experiences that help businesses grow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:scale-105 transition-transform duration-300 hover-target"
          >
            View Projects
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
