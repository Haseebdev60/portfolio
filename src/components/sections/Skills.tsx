import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const skillsData = [
  { name: 'React', level: 95, category: 'Frontend', color: 'from-blue-400 to-cyan-300' },
  { name: 'Next.js', level: 90, category: 'Frontend', color: 'from-gray-300 to-white' },
  { name: 'TypeScript', level: 85, category: 'Frontend', color: 'from-blue-500 to-blue-300' },
  { name: 'Tailwind CSS', level: 95, category: 'Frontend', color: 'from-teal-400 to-cyan-400' },
  { name: 'Framer Motion', level: 80, category: 'Frontend', color: 'from-purple-500 to-pink-500' },
  { name: 'GSAP', level: 75, category: 'Frontend', color: 'from-green-400 to-lime-400' },
  { name: 'Node.js', level: 85, category: 'Backend', color: 'from-green-500 to-emerald-400' },
  { name: 'Express', level: 80, category: 'Backend', color: 'from-gray-400 to-gray-200' },
  { name: 'MongoDB', level: 85, category: 'Database', color: 'from-green-600 to-green-400' },
  { name: 'Firebase', level: 90, category: 'Database', color: 'from-yellow-400 to-orange-400' },
];

const categories = ['All', 'Frontend', 'Backend', 'Database'];

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const filteredSkills = skillsData.filter(
    skill => activeCategory === 'All' || skill.category === activeCategory
  );

  return (
    <section id="skills" ref={containerRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neonBlue to-neonPurple mx-auto rounded-full" />
        </motion.div>

        <div className="flex justify-center flex-wrap gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-white text-black glow-blue scale-105'
                  : 'glass text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <Tilt 
              key={skill.name}
              tiltMaxAngleX={10} 
              tiltMaxAngleY={10} 
              perspective={1000} 
              scale={1.02} 
              transitionSpeed={2000}
            >
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass-card rounded-2xl p-6 group hover:glow-purple relative overflow-hidden h-full"
              >
                <div className="absolute -inset-2 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-display font-semibold text-white">{skill.name}</h3>
                    <span className="text-sm font-medium text-gray-400">{skill.level}%</span>
                  </div>
                  
                  <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                      className={`h-full bg-gradient-to-r ${skill.color} relative`}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
