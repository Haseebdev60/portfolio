import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  { id: '01', title: 'Research', desc: 'Understanding your business goals, target audience, and market competition to formulate a winning strategy.' },
  { id: '02', title: 'Planning', desc: 'Creating a comprehensive project roadmap, defining tech stack, and mapping out user journeys.' },
  { id: '03', title: 'UI/UX Design', desc: 'Designing premium, high-converting interfaces with a focus on modern aesthetics and user psychology.' },
  { id: '04', title: 'Development', desc: 'Writing clean, scalable code using React, Next.js, and implementing smooth Framer Motion animations.' },
  { id: '05', title: 'Testing', desc: 'Rigorous QA testing across all devices and browsers to ensure a bug-free, blazing-fast experience.' },
  { id: '06', title: 'Deployment', desc: 'Launching your product to the world with optimized SEO and continuous integration pipelines.' },
];

export const Workflow = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 relative" ref={containerRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            Proven <span className="text-gradient">Process</span>
          </h2>
          <p className="text-gray-400">A systematic approach to delivering world-class digital products.</p>
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2" />
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-neonBlue via-neonPurple to-neonBlue -translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={step.id} className="relative flex items-center md:justify-between w-full">
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-background border-4 border-neonBlue z-10 -translate-x-1/2 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.5)]">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>

                  <div className={`hidden md:block w-5/12 ${isEven ? 'order-1' : 'order-2'}`}></div>

                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`w-full pl-16 md:pl-0 md:w-5/12 ${isEven ? 'order-2 md:text-left' : 'order-1 md:text-right'}`}
                  >
                    <div className={`glass-card p-6 md:p-8 rounded-2xl hover:glow-purple transition-all duration-300 relative overflow-hidden group`}>
                      <div className="absolute -inset-2 bg-gradient-to-r from-neonBlue/10 to-neonPurple/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-2xl" />
                      
                      <span className="text-5xl font-display font-bold text-white/5 absolute -top-4 -right-2 md:relative md:top-0 md:right-0 md:text-6xl md:mb-2 md:inline-block md:text-white/10">
                        {step.id}
                      </span>
                      
                      <h3 className="text-2xl font-bold text-white mb-3 relative z-10">{step.title}</h3>
                      <p className="text-gray-400 leading-relaxed relative z-10">{step.desc}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
