import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Monitor, Server, Paintbrush, RefreshCw, Zap } from 'lucide-react';

const services = [
  {
    title: 'Frontend Development',
    description: 'Building immersive, cinematic, and highly responsive user interfaces using modern frameworks like React and Next.js.',
    icon: Monitor,
    color: 'from-blue-500 to-cyan-400'
  },
  {
    title: 'Full Stack Development',
    description: 'End-to-end architecture creating robust, scalable backends linked perfectly with dynamic frontends.',
    icon: Server,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'UI/UX Design',
    description: 'Crafting visually stunning, Apple-inspired designs focusing on user psychology and conversion optimization.',
    icon: Paintbrush,
    color: 'from-orange-400 to-pink-500'
  },
  {
    title: 'Website Redesign',
    description: 'Transforming outdated websites into modern, premium experiences that build instant trust.',
    icon: RefreshCw,
    color: 'from-green-400 to-cyan-500'
  },
  {
    title: 'Performance Optimization',
    description: 'Auditing and optimizing web apps to achieve 100/100 Lighthouse scores and seamless load times.',
    icon: Zap,
    color: 'from-yellow-400 to-orange-500'
  }
];

export const Services = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="services" ref={containerRef} className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-neonBlue/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            Premium <span className="text-gradient">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Delivering top-tier development solutions tailored for businesses aiming to dominate their digital space.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            // Make the first item span 2 columns on lg screens for an interesting bento grid feel
            const isWide = index === 0;
            
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className={`glass-card rounded-3xl p-8 group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden ${isWide ? 'lg:col-span-2' : ''}`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Icon className="w-32 h-32" />
                </div>
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${service.color} mb-6 shadow-lg relative z-10`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-display font-bold text-white mb-3 relative z-10">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed relative z-10 max-w-md">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
